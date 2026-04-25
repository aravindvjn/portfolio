import Footer from "@/components/common/footer";
import NavBar from "@/components/common/nav-bar";
import Projects from "@/components/projects/projects";
import { getAllProjects } from "@/services/projects.service";
import { notFound } from "next/navigation";

const categories = ["personal", "professional", "npm"] as const;

type WorksCategory = (typeof categories)[number];

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

const Page = async ({
  params,
}: {
  params: Promise<{ category: WorksCategory }>;
}) => {
  const { category } = await params;

  if (!categories.includes(category)) {
    notFound();
  }

  const { data } = await getAllProjects(category);

  return (
    <section>
      <NavBar />

      <Projects
        projects={data?.projects}
        npmPackages={data?.npmPackages}
        stats={data.stats}
        activeCategory={category}
        showAllLink
      />

      <Footer />
    </section>
  );
};

export default Page;
