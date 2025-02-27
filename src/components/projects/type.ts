import { Dispatch, SetStateAction } from "react";

export interface ProjectType {
    id: string;
    content: string;
    name: string;
    githubLink: string;
    image_url: string | null;
    priority: number | null;
}

export interface ShowPreviewType extends ProjectType {
    showPreview: boolean;
    setShowPreview: Dispatch<SetStateAction<boolean>>;
}