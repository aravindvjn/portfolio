import { Dispatch, SetStateAction } from "react";

export type ProjectCategory = "PERSONAL" | "PROFESSIONAL";

export type ProjectType = {
  id: string;
  name: string;
  content: string;
  githubLink: string;
  image_url?: string | null;
  priority?: number | null;
  category: ProjectCategory;
  tags: string[];
};

export interface ShowPreviewType extends ProjectType {
    showPreview: boolean;
    setShowPreview: Dispatch<SetStateAction<boolean>>;
}