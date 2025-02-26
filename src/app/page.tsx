import AboutMe from "@/components/about-me/about-me";
import Footer from "@/components/common/footer";
import Contact from "@/components/contact/contact";
import Hero from "@/components/hero/hero";
import MyStack from "@/components/my-stack/my-stack";
import Projects from "@/components/projects/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <MyStack />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
