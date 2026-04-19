"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

type ProjectCategory = "PERSONAL" | "PROFESSIONAL";

type ProjectType = {
  id: string;
  name: string;
  content: string;
  githubLink: string;
  image_url?: string | null;
  category: ProjectCategory;
  tags: string[];
};

const FILTERS: { label: string; value: "ALL" | ProjectCategory }[] = [
  { label: "All", value: "ALL" },
  { label: "Personal", value: "PERSONAL" },
  { label: "Professional", value: "PROFESSIONAL" },
];

const ProjectsShowcase = ({ projects }: { projects: ProjectType[] }) => {
  const [activeFilter, setActiveFilter] = useState<"ALL" | ProjectCategory>("ALL");
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!filtered.length) return;

    const ctx = gsap.context(() => {
      const totalScrollHeight = filtered.length * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: "top top",
          end: `+=${totalScrollHeight}%`,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (filtered.length - 1));
            setActiveIndex(Math.min(filtered.length - 1, Math.max(0, index)));
          },
        },
      });

      gsap.set(progressRef.current, { scaleY: 0, transformOrigin: "top center" });
      tl.to(progressRef.current, { scaleY: 1, ease: "none" }, 0);

      filtered.forEach((_, i) => {
        if (i === 0) {
          gsap.set(`[data-slide="0"]`, { opacity: 1, y: 0 });
        } else {
          gsap.set(`[data-slide="${i}"]`, { opacity: 0, y: 50 });
          
          tl.to(`[data-slide="${i}"]`, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i)
            .to(`[data-slide="${i - 1}"]`, { opacity: 0, y: -50, duration: 1, ease: "power2.in" }, i);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filtered]);

  if (!filtered.length) return null;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div className="absolute inset-0 -z-10" style={{ height: `${filtered.length * 100}vh` }} />

      <div ref={pinRef} className="relative flex h-screen w-full flex-col overflow-hidden px-6 py-8 md:px-16">
        <header className="relative z-20 flex w-full items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/50">
            Selected Work
          </p>
          <div className="hidden flex-col items-center gap-2 md:flex">
            <span className="text-xs font-medium text-foreground/50">
              {String(activeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
            </span>
            <div className="h-20 w-[2px] overflow-hidden rounded-full bg-foreground/10">
              <div ref={progressRef} className="h-full w-full bg-foreground" />
            </div>
          </div>
        </header>

        <nav className="relative z-20 mt-6 flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setActiveFilter(f.value);
                setActiveIndex(0);
              }}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all duration-300 ${
                activeFilter === f.value
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>

        <div className="relative flex-1">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              data-slide={i}
              className="absolute inset-0 flex items-center"
            >
              <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="text-5xl font-bold uppercase leading-tight md:text-7xl lg:text-8xl">
                    {project.name}
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
                    {project.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[11px] text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="inline-block rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
                    >
                      {project.githubLink.includes("github") ? "Source Code" : "Visit Site"}
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl">
                  <div className="flex gap-1.5 border-b border-foreground/10 bg-foreground/5 p-3">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <div className="relative h-full w-full">
                    <Image
                      src={project.image_url || "/placeholder.jpg"}
                      alt={project.name}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;