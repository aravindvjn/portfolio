import React from "react";
import { ShowPreviewType } from "./type";
import Image from "next/image";
import Heading from "../common/heading";
import { CardContainer } from "../ui/3d-card";

const ShowPreview = ({
  setShowPreview,
  showPreview,
  image_url,
  name,
}: ShowPreviewType) => {
  const placeholder = "/placeholder.jpg";

  if (!showPreview) return;
  return (
    <div
      onClick={() => setShowPreview(false)}
      className="fixed inset-0 z-10 hidden sm:flex bg-black/80 backdrop-blur flex-col items-center h-dvh justify-center  overflow-scroll"
    >
      <CardContainer className="flex flex-col p-10 h-fit w-screen">
        <Heading text={name} />
        <Image
          className="w-fit rounded order-2 border border-white/40 object-contain"
          src={image_url || placeholder}
          alt=""
          height={1000}
          width={1000}
        />
      </CardContainer>
    </div>
  );
};

export default ShowPreview;
