"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const GREEN = "#1B5E3B";
const LABEL_ORANGE = "#C45A12";

/** Square stage size (px) — keeps dashed ring + icons on a true circle */
const RING_SIZE = 600;
/** Dashed SVG share of stage; circle r=46 in 100 viewBox → radius in px */
const RING_SCALE = 0.93;
const RING_RADIUS = Math.round(RING_SIZE * RING_SCALE * 0.46);

/**
 * 6 planets equally spaced every 60° on the ring (0° = right, -90° = top).
 * Starts at top-left (−120°) and goes clockwise.
 */
const benefitMeta = [
  {
    id: "vitamin-c",
    label: "Vitamin C",
    detail:
      "1 cup of OranGo delivers 100% of the recommended daily intake (RDI) of Vitamin C",
    Icon: VitaminCIcon,
  },
  {
    id: "immunity",
    label: "Immunity",
    detail:
      "Stimulates white blood cell production and also has anti-inflammatory and antioxidant properties",
    Icon: ImmunityIcon,
  },
  {
    id: "heart",
    label: "Heart Health",
    detail:
      "Helps maintain important cardiovascular health markers such as blood pressure, cholesterol, and endothelial function",
    Icon: HeartIcon,
  },
  {
    id: "skin",
    label: "Skin Wellness",
    detail:
      "Supports collagen production, skin hydration, and inflammation reduction",
    Icon: SkinIcon,
  },
  {
    id: "hydration",
    label: "Hydration",
    detail: "Provides useful electrolytes, especially potassium",
    Icon: DropIcon,
  },
  {
    id: "energy",
    label: "Energy Boost",
    detail: "Replenishes glycogen and also enhances cognition and alertness",
    Icon: BoltIcon,
  },
];

const benefits = benefitMeta.map((item, i) => ({
  ...item,
  angle: -120 + i * 60,
}));

function VitaminCIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[1.65rem] w-[1.65rem]" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="11" stroke="#EE6F28" strokeWidth="2.1" />
      <path
        d="M16 16V7M16 16l7.5 7.5M16 16l-7.5 7.5M16 16h10"
        stroke="#EE6F28"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.3" fill="#EE6F28" />
    </svg>
  );
}

function ImmunityIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[1.65rem] w-[1.65rem]" fill="none" aria-hidden>
      <path
        d="M16 5 24 8.5v6.8c0 5.2-3.4 9-8 10.7-4.6-1.7-8-5.5-8-10.7V8.5L16 5Z"
        stroke="#EE6F28"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M16 12.2v7.6M12.2 16h7.6"
        stroke="#EE6F28"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[1.65rem] w-[1.65rem]" fill="none" aria-hidden>
      <path
        d="M16 26s-9-5.8-9-12.2A5.2 5.2 0 0 1 16 10a5.2 5.2 0 0 1 9 3.8C25 20.2 16 26 16 26Z"
        stroke="#EE6F28"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 16h3l2-3 2.5 6 2-3H22"
        stroke="#EE6F28"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkinIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[1.65rem] w-[1.65rem]" fill="none" aria-hidden>
      <path
        d="M11 22c1.2-5 3.2-9 5-12 1.8 3 3.8 7 5 12"
        stroke="#EE6F28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 22.5c2 2.8 4.5 4 6 4s4-1.2 6-4"
        stroke="#EE6F28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20.5" cy="10" r="1.4" fill="#EE6F28" />
      <circle cx="23" cy="13.5" r="1" fill="#EE6F28" />
    </svg>
  );
}

function DropIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[1.65rem] w-[1.65rem]" fill="none" aria-hidden>
      <path
        d="M16 5c5 7 9 11 9 15.5a9 9 0 1 1-18 0C7 16 11 12 16 5Z"
        stroke="#EE6F28"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[1.65rem] w-[1.65rem]" fill="none" aria-hidden>
      <path
        d="M18 4 9 18h6l-1 10 9-14h-6l1-10Z"
        stroke="#EE6F28"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BenefitNode({ item, active, onEnter, onLeave, radius }) {
  const rad = (item.angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const x = cos * radius;
  const y = sin * radius;
  const Icon = item.Icon;

  // Open outward from the ring (away from center pour) — never inward
  const onRight = cos >= 0.2;
  const onLeft = cos <= -0.2;
  const onBottom = sin >= 0.45;
  const onTop = sin <= -0.45;

  let tipClass =
    "left-1/2 top-full mt-2 -translate-x-1/2"; // default: below node
  if (onRight) {
    tipClass = "left-[calc(100%+12px)] top-1/2 -translate-y-1/2";
  } else if (onLeft) {
    tipClass = "right-[calc(100%+12px)] top-1/2 -translate-y-1/2";
  } else if (onTop) {
    tipClass = "left-1/2 bottom-[calc(100%+10px)] -translate-x-1/2";
  } else if (onBottom) {
    tipClass = "left-1/2 top-[calc(100%+10px)] -translate-x-1/2";
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 z-[3]"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <button
        type="button"
        aria-describedby={active ? `benefit-tip-${item.id}` : undefined}
        className={`flex flex-col items-center gap-1.5 outline-none transition-transform duration-200 ${
          active ? "scale-110" : "hover:scale-105"
        }`}
      >
        <span className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full border-[2.5px] border-[#EE6F28] bg-white shadow-[0_6px_20px_rgba(120,40,0,0.14)] sm:h-[3.75rem] sm:w-[3.75rem]">
          <Icon />
        </span>
        <span
          className="max-w-[7rem] text-center text-[12.5px] font-semibold leading-tight tracking-[-0.01em] sm:text-[13.5px]"
          style={{ color: GREEN }}
        >
          {item.label}
        </span>
      </button>

      <AnimatePresence>
        {active ? (
          <motion.div
            id={`benefit-tip-${item.id}`}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.94, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 2 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-30 w-[min(248px,74vw)] overflow-hidden rounded-2xl border border-[#EE6F28]/25 bg-gradient-to-br from-white via-white to-[#FFF6EE] shadow-[0_18px_44px_rgba(80,30,0,0.22)] sm:w-[268px] ${tipClass}`}
          >
            <div className="flex items-center gap-2.5 border-b border-[#EE6F28]/12 bg-[#FFF3E0]/55 px-3.5 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#EE6F28] bg-white">
                <span className="scale-[0.72]">
                  <Icon />
                </span>
              </span>
              <p
                className="text-[13px] font-semibold tracking-[-0.02em]"
                style={{ color: GREEN }}
              >
                {item.label}
              </p>
            </div>
            <p className="px-3.5 py-3 text-[12.5px] leading-relaxed text-[#3F3F46] sm:text-[13px]">
              {item.detail}
            </p>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#EE6F28] via-[#F4A261] to-transparent"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function HealthBenefits() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(null);

  return (
    <section
      aria-labelledby="benefits-heading"
      className="relative overflow-hidden bg-[#F07820] py-8 sm:py-9 md:py-10"
    >
      {/* Client juice-splash background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/benefits/health-splash-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1080px] px-5 md:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p
            className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] sm:text-[12px]"
            style={{ color: LABEL_ORANGE }}
          >
            <span
              aria-hidden
              className="h-px w-9 sm:w-11"
              style={{ backgroundColor: LABEL_ORANGE }}
            />
            Health Benefits
            <span
              aria-hidden
              className="h-px w-9 sm:w-11"
              style={{ backgroundColor: LABEL_ORANGE }}
            />
          </p>
          <h2
            id="benefits-heading"
            className="mt-2 text-[clamp(1.7rem,3.6vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
            style={{ color: GREEN }}
          >
            Every Cup Brings Natural Wellness.
          </h2>
        </header>

        {/* Perfect square stage so ring + planets share one center */}
        <div
          className="relative mx-auto mt-3 hidden md:block"
          style={{ width: RING_SIZE, height: RING_SIZE }}
        >
          {/* Dashed ring — same center & radius as planet orbit */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
            width={Math.round(RING_SIZE * RING_SCALE)}
            height={Math.round(RING_SIZE * RING_SCALE)}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.55"
              strokeDasharray="1.6 2.4"
            />
          </svg>

          {/* Pour / cup — exact geometric center of the ring */}
          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
            <div className="relative aspect-square w-[58%] max-w-[360px]">
              <Image
                src="/benefits/orango-pour.png"
                alt="Fresh orange juice pouring into an OranGo cup"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(120,40,0,0.25)] [mix-blend-mode:screen]"
                sizes="360px"
                priority
              />
            </div>
          </div>

          {benefits.map((item) => (
            <BenefitNode
              key={item.id}
              item={item}
              radius={RING_RADIUS}
              active={activeId === item.id}
              onEnter={() => setActiveId(item.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="mt-5 md:hidden">
          <div className="relative mx-auto w-[80%] max-w-[340px]">
            <Image
              src="/benefits/orango-pour.png"
              alt="Fresh orange juice pouring into an OranGo cup"
              width={600}
              height={900}
              className="h-auto w-full object-contain [mix-blend-mode:screen]"
              sizes="340px"
            />
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2.5">
            {benefits.map((item, i) => {
              const Icon = item.Icon;
              const open = activeId === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(open ? null : item.id)}
                    className={`flex w-full flex-col items-center overflow-hidden rounded-2xl border px-2.5 py-3 text-center shadow-[0_8px_22px_rgba(80,30,0,0.12)] transition-colors ${
                      open
                        ? "border-[#EE6F28]/45 bg-gradient-to-b from-white to-[#FFF6EE]"
                        : "border-white/70 bg-white/95"
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#EE6F28] bg-white shadow-sm">
                      <Icon />
                    </span>
                    <span
                      className="mt-1.5 text-[12px] font-semibold"
                      style={{ color: GREEN }}
                    >
                      {item.label}
                    </span>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-2 overflow-hidden border-t border-[#EE6F28]/15 pt-2 text-left text-[11px] leading-snug text-[#52525B]"
                        >
                          {item.detail}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <footer className="mt-4 space-y-0.5 text-center sm:mt-5">
          <p className="text-[12px] font-medium text-white/85">
            Not a medical claim.
          </p>
          <p className="text-[11px] text-white/70">Source: Academic Journals</p>
        </footer>
      </div>
    </section>
  );
}
