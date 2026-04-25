import Footer from "@/components/common/footer";
import NavBar from "@/components/common/nav-bar";
import Projects from "@/components/projects/projects";
import { getAllProjects } from "@/services/projects.service";

type WorksCategory = "personal" | "professional" | "npm";

type Params = {
  searchParams: Promise<{
    category?: WorksCategory;
  }>;
};

const page = async ({ searchParams }: Params) => {
  const params = await searchParams;

  const category = params.category;

  const validCategory: WorksCategory | undefined =
    category === "personal" || category === "professional" || category === "npm"
      ? category
      : undefined;

  const { data } = await getAllProjects(validCategory);

  return (
    <section>
      <NavBar />
      <Projects
        projects={data?.projects}
        npmPackages={data?.npmPackages}
        stats={data.stats}
        activeCategory={validCategory}
        showAllLink
      />
      <Footer />
    </section>
  );
};

export default page;
