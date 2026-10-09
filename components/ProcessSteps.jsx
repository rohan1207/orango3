"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import OrangeSliceDecor from "./OrangeSliceDecor";

const GREEN = "#1F6B3A";
const ORANGE = "#EE6F28";

const steps = [
  { id: "pay", title: "Tap & Pay" },
  {
    id: "squeeze",
    title: "Watch oranges freshly squeezed in front of you",
  },
  {
    id: "enjoy",
    title: "Enjoy chilled orange juice in < 1 minute",
  },
];

/** White payment glyph on solid orange circle */
function TapIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-[1.7rem] w-[1.7rem] sm:h-[1.85rem] sm:w-[1.85rem]" fill="none" aria-hidden>
      <rect
        x="8"
        y="14"
        width="32"
        height="22"
        rx="3.5"
        stroke="#fff"
        strokeWidth="2.4"
      />
      <path d="M8 21h32" stroke="#fff" strokeWidth="2.4" />
      <path
        d="M14 29h8"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="29" r="2.2" fill="#fff" />
    </svg>
  );
}

function OrangeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-[1.75rem] w-[1.75rem] sm:h-[1.9rem] sm:w-[1.9rem]" fill="none" aria-hidden>
      <circle cx="24" cy="25" r="11" fill="#fff" />
      <path
        d="M24 25V15.5M24 25l6.5 6.5M24 25l-6.5 6.5M24 25h9"
        stroke={ORANGE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="25" r="2.4" fill={ORANGE} />
      <path
        d="M21.5 12c2.2-.9 4.8-.9 7 0"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JuiceIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-[1.75rem] w-[1.75rem] sm:h-[1.9rem] sm:w-[1.9rem]" fill="none" aria-hidden>
      <path
        d="M17 13h14l-1.35 20.5a5 5 0 0 1-5 4.15h-1.3a5 5 0 0 1-5-4.15L17 13Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M19.2 27.5c2.3 3.2 7.3 3.2 9.6 0"
        stroke={ORANGE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M19.5 9.5h9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const icons = {
  pay: TapIcon,
  squeeze: OrangeIcon,
  enjoy: JuiceIcon,
};

export default function ProcessSteps() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-[#F7F4F0] py-10 md:py-12 lg:py-14"
    >
      <OrangeSliceDecor
        className="right-[-6%] top-[-4%] h-44 w-44 md:h-56 md:w-56 lg:h-64 lg:w-64"
        opacity={0.18}
        rotate={18}
      />
      <OrangeSliceDecor
        className="bottom-[-8%] left-[-5%] h-40 w-40 md:h-52 md:w-52 lg:h-56 lg:w-56"
        opacity={0.16}
        rotate={-14}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="process-heading"
            className="text-[clamp(1.55rem,3.1vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.03em]"
            style={{ color: GREEN }}
          >
            Fresh Orange Juice, Made Convenient
          </h2>
          <p className="mt-2 text-[15px] leading-snug text-[#8A8F98] md:text-[16px]">
            Seamless fully automated experience.
          </p>
        </header>

        {/* Machine + cards — no panel/box behind the machine image */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 grid items-center gap-8 md:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-5 xl:gap-7"
        >
          <div className="relative mx-auto w-full max-w-[380px] bg-transparent sm:max-w-[440px] lg:mx-0 lg:max-w-[560px] lg:scale-[1.1] lg:origin-center">
            <Image
              src="/machine.png"
              alt="OranGo vending machine"
              width={900}
              height={1200}
              className="h-auto w-full bg-transparent object-contain"
              sizes="(max-width: 1024px) 85vw, 50vw"
              priority
            />
          </div>

          <ol className="flex flex-col justify-center gap-5 pt-4 sm:gap-5 sm:pt-5 lg:gap-6 lg:translate-y-3 xl:gap-7 xl:translate-y-4">
            {steps.map((step, index) => {
              const Icon = icons[step.id];
              return (
                <motion.li
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : 0.06 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-4 md:gap-5"
                >
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full md:h-[4.25rem] md:w-[4.25rem]"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <Icon />
                  </span>
                  <div className="min-w-0 flex-1 rounded-[2rem] border border-[#EE6F28]/50 bg-white px-6 py-[1.15rem] sm:rounded-[2.25rem] sm:px-8 sm:py-5 md:px-9 md:py-[1.5rem]">
                    <p
                      className="text-[16px] font-semibold leading-snug tracking-[-0.015em] sm:text-[17px] md:text-[19px] lg:text-[20px]"
                      style={{ color: GREEN }}
                    >
                      {step.title}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
