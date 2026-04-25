"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Package, ExternalLink } from "lucide-react"; 
import { BsGithub } from "react-icons/bs";
import { NpmPackageType } from "./projects";

gsap.registerPlugin(useGSAP);

export default function NpmPackageCard({ item }: { item: NpmPackageType }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all", 
    });
  }, { scope: cardRef });

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { 
      y: -6, 
      scale: 1.01, 
      duration: 0.4, 
      ease: "back.out(1.5)" 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { 
      y: 0, 
      scale: 1, 
      duration: 0.4, 
      ease: "power2.out" 
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-300 transition-colors duration-300 group-hover:border-blue-400/40 group-hover:text-blue-200">
            <Package size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-100">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-blue-300">{item.packageName}</p>
          </div>
        </div>

        {item.version && (
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
            v{item.version}
          </span>
        )}
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-white/60">
        {item.description}
      </p>

      {item.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/60 transition-colors group-hover:border-white/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {item.npmUrl && (
          <Link
            href={item.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
          >
            NPM <ExternalLink size={14} />
          </Link>
        )}

        {item.githubUrl && (
          <Link
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.1] hover:text-white"
          >
            GitHub <BsGithub size={14} />
          </Link>
        )}

        {item.demoUrl && (
          <Link
            href={item.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.1] hover:text-white"
          >
            Demo <ExternalLink size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}