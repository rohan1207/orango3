"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  clearAllFrameCaches,
  folderFromWidth,
  injectFramePreloadLinks,
  invalidateFrameSessionsForSet,
  totalForFolder,
  warmupFramesFromLanding,
} from "@/lib/frames";

const HOME_FRAME_SET = "home4";
const ABSOLUTE_FAILSAFE_MS = 120000;
/** Video drives this share of the bar; frames drive the rest after video ends */
const VIDEO_BAR_SHARE = 0.55;

/**
 * Landing video + full frame preload (296).
 * Bar never jumps backward: video fills first segment, then frames finish to 100%.
 */
export default function LandingIntro({ onComplete }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const framesReadyRef = useRef(false);
  const videoEndedRef = useRef(false);
  const frameRatioRef = useRef(0);
  const sessionUnsubRef = useRef(null);

  const [sliderPct, setSliderPct] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  const computePct = (videoRatio, frameRatio, videoDone) => {
    const v = Math.min(1, Math.max(0, videoRatio));
    const f = Math.min(1, Math.max(0, frameRatio));
    if (!videoDone) {
      // Video phase only — never claim 100% until frames are ready
      return Math.min(VIDEO_BAR_SHARE * 100 - 0.01, v * VIDEO_BAR_SHARE * 100);
    }
    // After video: continue from video share → 100% with frame load
    return VIDEO_BAR_SHARE * 100 + f * (1 - VIDEO_BAR_SHARE) * 100;
  };

  const applyPct = (videoRatio, frameRatio, videoDone) => {
    const next = computePct(videoRatio, frameRatio, videoDone);
    setSliderPct((prev) => Math.max(prev, next)); // never go backward
  };

  const tryFinish = () => {
    if (doneRef.current) return;
    if (!videoEndedRef.current || !framesReadyRef.current) return;
    doneRef.current = true;
    setSliderPct(100);
    onComplete?.();
  };

  const syncVideoProgress = () => {
    if (videoEndedRef.current) return;
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const v = video.currentTime / video.duration;
    applyPct(v, frameRatioRef.current, false);
  };

  useEffect(() => {
    let cancelled = false;
    let failSafe = 0;
    let removeLinks = () => {};

    (async () => {
      invalidateFrameSessionsForSet(HOME_FRAME_SET);
      await clearAllFrameCaches();
      if (cancelled) return;

      const folder = folderFromWidth(window.innerWidth, HOME_FRAME_SET);
      const total = totalForFolder(folder);
      removeLinks = injectFramePreloadLinks(folder, total);

      const session = warmupFramesFromLanding(HOME_FRAME_SET);

      const markFramesReady = () => {
        if (framesReadyRef.current) return;
        framesReadyRef.current = true;
        frameRatioRef.current = 1;
        setFramesReady(true);
        applyPct(1, 1, videoEndedRef.current);
        tryFinish();
      };

      if (session?.subscribe) {
        sessionUnsubRef.current = session.subscribe(({ loaded, total: t }) => {
          if (t > 0) {
            const ratio = loaded / t;
            frameRatioRef.current = ratio;
            applyPct(
              videoEndedRef.current ? 1 : 0,
              ratio,
              videoEndedRef.current,
            );
            // If video still playing, keep merging with live video time
            if (!videoEndedRef.current) syncVideoProgress();
          }
          if (t > 0 && loaded >= t && session.frames?.[0]) {
            markFramesReady();
          }
        });
      }

      session?.promise?.then?.(() => {
        if (cancelled || doneRef.current) return;
        if (
          session.total > 0 &&
          session.loaded >= session.total &&
          session.frames?.[0]
        ) {
          markFramesReady();
        }
      });

      failSafe = window.setTimeout(() => {
        framesReadyRef.current = true;
        videoEndedRef.current = true;
        frameRatioRef.current = 1;
        setFramesReady(true);
        setVideoEnded(true);
        setSliderPct(100);
        tryFinish();
      }, ABSOLUTE_FAILSAFE_MS);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      if (sessionUnsubRef.current) sessionUnsubRef.current();
      removeLinks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        /* gated by frames + video end */
      }
    };

    tryPlay();
  }, []);

  const onVideoDone = () => {
    if (videoEndedRef.current) return;
    videoEndedRef.current = true;
    setVideoEnded(true);
    applyPct(1, frameRatioRef.current, true);
    tryFinish();
  };

  const waitingForFrames = videoEnded && !framesReady;
  const label = waitingForFrames
    ? "Preparing experience…"
    : `${Math.round(sliderPct)}%`;

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-8 overflow-hidden bg-white px-5">
      <div className="relative max-h-[70vh] max-w-[min(920px,92vw)] overflow-hidden bg-white [clip-path:inset(0)]">
        <video
          ref={videoRef}
          src="/video.mp4"
          className="block h-auto max-h-[70vh] w-auto max-w-full scale-[1.01] border-0 object-contain outline-none [transform:translateZ(0)]"
          playsInline
          muted
          autoPlay
          preload="auto"
          onTimeUpdate={syncVideoProgress}
          onLoadedMetadata={syncVideoProgress}
          onEnded={onVideoDone}
          onError={onVideoDone}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "#fff",
          }}
        />
      </div>

      <div className="w-full max-w-[min(420px,88vw)]">
        <div className="relative h-1.5 rounded-full bg-[#EE6F28]/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#EE6F28] transition-[width] duration-200 ease-out"
            style={{ width: `${sliderPct}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-200 ease-out"
            style={{ left: `${sliderPct}%` }}
          >
            <Image
              src="/orange1.png"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 drop-shadow-[0_2px_6px_rgba(238,111,40,0.35)]"
              priority
            />
          </div>
        </div>
        <p className="mt-4 text-center text-[12px] font-semibold tracking-[0.2em] text-[#8B3410]/55">
          {label}
        </p>
      </div>
    </main>
  );
}
