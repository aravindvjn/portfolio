import AboutMe from "@/components/about-me/about-me";
import Contact from "@/components/contact/contact";
import Hero from "@/components/hero/hero";
import MyStack from "@/components/my-stack/my-stack";
import LoadingProjects from "@/components/projects/loading-projects";
import Projects from "@/components/projects/projects";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <MyStack />
      <Projects />

      <Contact />
    </>
  );
}
