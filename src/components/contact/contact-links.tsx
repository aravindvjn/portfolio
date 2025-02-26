import Link from "next/link";
import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const ContactLinks = () => {
  return (
    <div className="flex md:w-1/2 flex-wrap gap-[10px] sm:gap-[15px] justify-between">
      {contactOptions.map((option, index) => (
        <Link
          className="flex w-fit items-center gap-[10px]"
          href={option.link}
          key={index}
          target="_blank"
        >
          {option.icon} {option.label}
        </Link>
      ))}
    </div>
  );
};

export default ContactLinks;

const contactOptions = [
  {
    label: "GitHub",
    link: "https://github.com/aravindvjn",
    icon: <BsGithub />,
  },
  {
    label: "WhatsApp",
    link: "https://wa.me/+917559027982",
    icon: <BsWhatsapp />,
  },
  {
    label: "LinkedIn",
    link: "https://instagram.com/6windh",
    icon: <BsLinkedin />,
  },
  {
    label: "Instagram",
    link: "https://instagram.com/6windh",
    icon: <BsInstagram />,
  },
  {
    label: "Email",
    link: "mailto:aravind284479@gmail.com",
    icon: <MdEmail />,
  },
];
