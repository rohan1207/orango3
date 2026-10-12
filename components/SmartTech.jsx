"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import LiveBlobs from "./LiveBlobs";

const GREEN = "#1F6B3A";
const ORANGE = "#EE6F28";

const features = [
  {
    title: "Oranges stored at 4°C",
    copy: "Fresh oranges and naturally chilled juice",
    hint: "4°C",
    icon: ColdStorageIcon,
  },
  {
    title: "UPI enabled payments",
    copy: "Seamless experience",
    hint: "UPI",
    icon: PhonePayIcon,
  },
  {
    title: "Scheduled self-cleaning",
    copy: "Regular cleaning intervals.",
    hint: "Auto",
    icon: BubblesCleanIcon,
  },
  {
    title: "Ozone sterilization",
    copy: "Enhanced hygiene.",
    hint: "O₃",
    icon: OzoneSparkIcon,
  },
  {
    title: "Sealed for maximum benefits",
    copy: "Preserves nutrients and freshness",
    hint: "Seal",
    icon: SealedCupIcon,
  },
  {
    title: "Daily tracking",
    copy: "For regular replenishment.",
    hint: "Live",
    icon: RestockIcon,
  },
];

const bentoTiles = [
  {
    src: "/bento/machine-hero-v3.jpg",
    alt: "OranGo fresh orange juice vending machine",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/bento/oranges-inside.jpg",
    alt: "Fresh oranges stored inside the OranGo machine",
    className: "col-span-2 row-span-1",
  },
  {
    src: "/bento/pure-juice-promo.jpg",
    alt: "100% pure OranGo orange juice — no dilution, no additives",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/bento/cup-product-v2.jpg",
    alt: "OranGo cup of fresh orange juice with a whole orange",
    className: "col-span-1 row-span-1",
  },
];

function ColdStorageIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <path
        d="M16 4v24M16 10l4.5-2.6M16 10l-4.5-2.6M16 22l4.5 2.6M16 22l-4.5 2.6M8.5 8.5 23.5 23.5M23.5 8.5 8.5 23.5M10 16h12"
        stroke={ORANGE}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.2" fill={ORANGE} />
    </svg>
  );
}

function PhonePayIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <rect
        x="9"
        y="3.5"
        width="14"
        height="25"
        rx="3"
        stroke={ORANGE}
        strokeWidth="1.9"
      />
      <path d="M13 6.5h6" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16" cy="25.5" r="1.2" fill={ORANGE} />
      <path
        d="M12.5 13.5h3.2v3.2h-3.2v-3.2Zm4.3 0H20v2H16.8v-2Zm0 3.5H19v3h-2.2v-3Zm-4.3 1.2h2v2.8h-2v-2.8Z"
        fill={ORANGE}
      />
    </svg>
  );
}

function BubblesCleanIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <circle cx="12" cy="18" r="5.2" stroke={ORANGE} strokeWidth="1.9" />
      <circle cx="21" cy="13" r="3.6" stroke={ORANGE} strokeWidth="1.8" />
      <circle cx="22.5" cy="22.5" r="2.4" stroke={ORANGE} strokeWidth="1.7" />
      <circle cx="11" cy="10" r="1.6" fill={ORANGE} />
      <path
        d="M7.5 24.5c1.8 1.6 4.2 2.4 6.5 1.6"
        stroke={ORANGE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OzoneSparkIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <path
        d="M16 3.5 17.8 12l8.2 1.1-6.3 5.4 1.8 8.5L16 22.6l-5.5 4.4 1.8-8.5-6.3-5.4L14.2 12 16 3.5Z"
        stroke={ORANGE}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="15.2" r="2.4" fill={ORANGE} />
    </svg>
  );
}

function SealedCupIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <path
        d="M10 10h12l-1.2 14.2a3 3 0 0 1-3 2.8h-3.6a3 3 0 0 1-3-2.8L10 10Z"
        stroke={ORANGE}
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M9 10h14" stroke={ORANGE} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M12 7.5h8" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M15.2 15.5c.8 1.6 2.8 1.6 3.6 0"
        stroke={ORANGE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RestockIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <path
        d="M6 14h14l2.5 4.5H26v5.5a2 2 0 0 1-2 2h-1"
        stroke={ORANGE}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="25.5" r="2.2" stroke={ORANGE} strokeWidth="1.8" />
      <circle cx="21.5" cy="25.5" r="2.2" stroke={ORANGE} strokeWidth="1.8" />
      <path
        d="M6 14V8.5a1.5 1.5 0 0 1 1.5-1.5H16"
        stroke={ORANGE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 5.5h6.5M16.25 3v5"
        stroke={ORANGE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SmartTech() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="tech-heading"
      className="relative overflow-hidden bg-[#FFFAF6] py-12 sm:py-16 lg:flex lg:h-[calc(100dvh-var(--nav-h))] lg:items-stretch lg:py-0"
    >
      <LiveBlobs
        items={[
          {
            className: "left-[-8%] top-[6%] h-48 w-48 md:h-56 md:w-56",
            opacity: 0.14,
            delay: 0,
            rotate: [0, 10, -6, 0],
          },
          {
            className: "right-[-6%] bottom-[8%] h-44 w-44 md:h-52 md:w-52",
            opacity: 0.12,
            delay: 0.7,
            rotate: [0, -8, 10, 0],
          },
        ]}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 py-0 lg:px-8 lg:py-6 xl:py-8">
        <div className="grid h-full min-h-0 flex-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-12">
          {/* Left — lifestyle bento */}
          <div className="relative order-2 flex h-[min(72vw,420px)] min-h-[280px] items-stretch sm:h-[460px] lg:order-1 lg:h-full lg:min-h-0">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2 sm:gap-2.5 lg:gap-3"
            >
              {bentoTiles.map((tile, i) => (
                <motion.div
                  key={tile.src}
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45 }}
                  className={`relative overflow-hidden rounded-2xl bg-[#FFF3E0] sm:rounded-[1.35rem] ${tile.className}`}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right content — client card grid */}
          <div className="order-1 flex min-h-0 flex-col justify-center lg:order-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EE6F28]">
              Inside the machine
            </p>
            <h2
              id="tech-heading"
              className="mt-2 text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#8B3410] lg:mt-2.5"
            >
              Fresh juice, every pour.
            </h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#8B3410]/65 sm:text-[15px] lg:mt-3.5">
              Cold storage, UPI, ozone cleaning and sealed cups — so guests trust
              the juice and hosts trust the machine.
            </p>

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-3.5 lg:mt-5 xl:mt-6">
              {features.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={reduce ? undefined : { y: -3 }}
                    className="group relative overflow-hidden rounded-2xl border border-[#EE6F28]/18 bg-gradient-to-br from-white via-white to-[#FFF6EE] p-3.5 shadow-[0_8px_24px_rgba(139,52,16,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#EE6F28]/45 hover:shadow-[0_14px_32px_rgba(238,111,40,0.14)] sm:p-4"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-[#EE6F28]/0 transition-all duration-300 group-hover:bg-[#EE6F28]"
                    />
                    <div className="flex items-start gap-3">
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3E0] ring-1 ring-[#EE6F28]/20 transition-transform duration-300 group-hover:scale-105 group-hover:ring-[#EE6F28]/40">
                        <Icon />
                        <span className="absolute -right-1.5 -top-1.5 rounded-full bg-[#EE6F28] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                          {item.hint}
                        </span>
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3
                          className="text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1rem]"
                          style={{ color: GREEN }}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-[#5C6370] sm:text-[13px]">
                          {item.copy}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
