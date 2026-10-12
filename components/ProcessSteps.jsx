"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import OrangeSliceDecor from "./OrangeSliceDecor";

const GREEN = "#1F6B3A";
const ORANGE = "#EE6F28";

const steps = [
  {
    id: "pay",
    title: "Tap & Pay",
    iconBefore: "/steps/pay-before-v2.png",
    iconAfter: "/steps/pay-after.png",
  },
  {
    id: "squeeze",
    title: "Watch oranges freshly squeezed in front of you",
    iconBefore: "/steps/squeeze-before.png",
    iconAfter: "/steps/squeeze-after.png",
  },
  {
    id: "enjoy",
    title: "Enjoy chilled orange juice in < 1 minute",
    iconBefore: "/steps/enjoy.png",
    iconAfter: "/steps/enjoy.png",
  },
];

export default function ProcessSteps() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-[#F7F4F0] py-10 md:py-12 lg:py-14"
    >
      <OrangeSliceDecor
        className="right-[-12%] top-[-10%] h-72 w-72 md:h-96 md:w-96 lg:h-[28rem] lg:w-[28rem]"
        opacity={0.24}
        rotate={18}
      />
      <OrangeSliceDecor
        className="bottom-[-14%] left-[-10%] h-64 w-64 md:h-80 md:w-80 lg:h-[26rem] lg:w-[26rem]"
        opacity={0.22}
        rotate={-14}
      />
      <OrangeSliceDecor
        className="left-[14%] top-[2%] h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
        opacity={0.17}
        rotate={42}
      />
      <OrangeSliceDecor
        className="right-[16%] top-[32%] h-28 w-28 md:h-36 md:w-36 lg:h-44 lg:w-44"
        opacity={0.15}
        rotate={-28}
      />
      <OrangeSliceDecor
        className="bottom-[6%] right-[2%] h-44 w-44 md:h-56 md:w-56 lg:h-64 lg:w-64"
        opacity={0.19}
        rotate={8}
      />
      <OrangeSliceDecor
        className="left-[4%] top-[42%] hidden h-28 w-28 md:block md:h-36 md:w-36 lg:h-44 lg:w-44"
        opacity={0.14}
        rotate={-52}
      />
      <OrangeSliceDecor
        className="left-[38%] bottom-[-8%] h-40 w-40 md:h-52 md:w-52 lg:h-60 lg:w-60"
        opacity={0.16}
        rotate={64}
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
          <div className="relative mx-auto w-full max-w-[340px] bg-transparent sm:max-w-[400px] lg:mx-0 lg:max-w-[480px] lg:scale-[0.95] lg:origin-center">
            <Image
              src="/machine-v2.png"
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
              const hasHoverSwap = step.iconBefore !== step.iconAfter;
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
                  className="group flex items-center gap-4 md:gap-5"
                >
                  <span className="relative flex h-[6rem] w-[6rem] shrink-0 items-center justify-center overflow-hidden rounded-full border-[2.5px] border-[#EE6F28] bg-white sm:h-[6.75rem] sm:w-[6.75rem] md:h-[7.5rem] md:w-[7.5rem]">
                    <Image
                      src={step.iconBefore}
                      alt=""
                      width={140}
                      height={140}
                      className={`h-[96%] w-[96%] object-contain transition-opacity duration-300 ${
                        hasHoverSwap
                          ? "opacity-100 group-hover:opacity-0"
                          : "opacity-100"
                      }`}
                    />
                    {hasHoverSwap ? (
                      <Image
                        src={step.iconAfter}
                        alt=""
                        width={140}
                        height={140}
                        className="pointer-events-none absolute h-[96%] w-[96%] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    ) : null}
                  </span>
                  <div className="min-w-0 flex-1 rounded-[2rem] border border-[#EE6F28]/50 bg-white px-6 py-[1.15rem] transition-colors duration-300 group-hover:border-[#EE6F28] sm:rounded-[2.25rem] sm:px-8 sm:py-5 md:px-9 md:py-[1.5rem]">
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
