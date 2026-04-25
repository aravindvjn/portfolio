import type {
  ContactOption,
  HeroWord,
  NpmPackage,
  Projects,
} from "@prisma/client";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ProjectItem = Projects;
export type HeroWordItem = HeroWord;
export type ContactOptionItem = ContactOption;
export type NpmPackageItem = NpmPackage;
export type ProjectCategory = "PERSONAL" | "PROFESSIONAL";

export type ProjectPayload = {
  name: string;
  content: string;
  githubLink: string;
  image_url?: string | null;
  priority?: number | null;
  category?: ProjectCategory;
  tags?: string[];
};

export type UpdateProjectPayload = {
  id: string;
  name?: string;
  content?: string;
  githubLink?: string;
  image_url?: string | null;
  priority?: number | null;
  category?: ProjectCategory;
  tags?: string[];
};
export type HeroWordPayload = {
  text: string;
  priority?: number | null;
};

export type UpdateHeroWordPayload = {
  id: string;
  text?: string;
  priority?: number | null;
};

export type ContactOptionPayload = {
  label: string;
  link: string;
  icon?: string | null;
  priority?: number | null;
  isActive?: boolean;
};

export type UpdateContactOptionPayload = {
  id: string;
  label?: string;
  link?: string;
  icon?: string | null;
  priority?: number | null;
  isActive?: boolean;
};

export type AdminStats = {
  totalProjects: number;
  totalHeroWords: number;
  totalContactOptions: number;
  activeContactOptions: number;
  inactiveContactOptions: number;
};

export type GetProjectsResponse = ActionResponse<ProjectItem[]>;
export type GetProjectResponse = ActionResponse<ProjectItem>;
export type CreateProjectResponse = ActionResponse<ProjectItem>;
export type UpdateProjectResponse = ActionResponse<ProjectItem>;
export type DeleteProjectResponse = ActionResponse<null>;

export type GetHeroWordsResponse = ActionResponse<HeroWordItem[]>;
export type GetHeroWordResponse = ActionResponse<HeroWordItem>;
export type CreateHeroWordResponse = ActionResponse<HeroWordItem>;
export type UpdateHeroWordResponse = ActionResponse<HeroWordItem>;
export type DeleteHeroWordResponse = ActionResponse<null>;

export type GetContactOptionsResponse = ActionResponse<ContactOptionItem[]>;
export type GetContactOptionResponse = ActionResponse<ContactOptionItem>;
export type CreateContactOptionResponse = ActionResponse<ContactOptionItem>;
export type UpdateContactOptionResponse = ActionResponse<ContactOptionItem>;
export type DeleteContactOptionResponse = ActionResponse<null>;
export type ToggleContactOptionResponse = ActionResponse<ContactOptionItem>;

export type GetAdminStatsResponse = ActionResponse<AdminStats>;

export type GetNpmPackageResponse = ActionResponse<NpmPackageItem>;
export type GetNpmPackagesResponse = ActionResponse<NpmPackageItem[]>;
export type CreateNpmPackageResponse = ActionResponse<NpmPackageItem>;
