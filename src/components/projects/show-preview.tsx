import React from "react";
import { ShowPreviewType } from "./type";
import Image from "next/image";
import Heading from "../common/heading";

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
      className="fixed inset-0 z-10 p-10 flex bg-black/50 backdrop-blur flex-col items-center h-dvh justify-center "
    >
      <Heading text={name} />
        <Image
          className="w-fit h-fit order-2 border object-contain"
          src={image_url || placeholder}
          alt=""
          height={1000}
          width={1000}
        />
    </div>
  );
};

export default ShowPreview;
