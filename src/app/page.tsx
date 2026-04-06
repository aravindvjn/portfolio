import AboutMe from "@/components/about-me/about-me";
import Footer from "@/components/common/footer";
import Contact from "@/components/contact/contact";
import Hero from "@/components/hero/hero";
import MyStack from "@/components/my-stack/my-stack";
import Projects from "@/components/projects/projects";
import { getPortfolioData } from "@/services/meta.service";

export default async function Home() {
  const { data } = await getPortfolioData();
  return (
    <>
      <Hero words={data?.heroWords?.map((i) => i?.text)} />
      <AboutMe />
      <MyStack />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
