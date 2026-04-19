import AboutMe from "@/components/about-me/about-me";
import Footer from "@/components/common/footer";
import Contact from "@/components/contact/contact";
import Hero from "@/components/hero/hero";
import HeroDesktop from "@/components/hero/HeroDesktop";
import MyStack from "@/components/my-stack/my-stack";
import Projects from "@/components/projects/projects";
import { getPortfolioData } from "@/services/meta.service";

export default async function Home() {
  const { data } = await getPortfolioData();
  return (
    <>
      <div className="md:hidden">
        <Hero words={data?.heroWords?.map((i) => i?.text)} />
        <AboutMe />
      </div>
      <div className="hidden md:block">
        <HeroDesktop words={data?.heroWords?.map((i) => i?.text)} />
      </div>
      <MyStack />
      <Projects projects={data?.projects} />
      <Contact contactOptions={data?.contactOptions} />
      <Footer />
    </>
  );
}
