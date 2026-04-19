import Link from "next/link";
import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { CONTACT_ICON_MAP, type ContactIconKey } from "@/utils/contact-icons";

type ContactOption = {
  id: string;
  label: string;
  link: string;
  icon: string | null;
};

const ContactLinks = ({
  contactOptions,
}: {
  contactOptions: ContactOption[];
}) => {
  return (
    <div className="flex md:w-1/2 flex-wrap justify-between gap-[10px] sm:gap-[15px]">
      {(contactOptions?.length > 0
        ? contactOptions
        : defaultContactOptions
      )?.map((option) => {
        const Icon = option.icon
          ? CONTACT_ICON_MAP[option.icon as ContactIconKey]
          : null;

        return (
          <Link
            className="flex w-fit items-center gap-[10px] hover:text-purple-500"
            href={option.link}
            key={option.id}
            target="_blank"
          >
            {Icon ? <Icon /> : null}
            {option.label}
          </Link>
        );
      })}
    </div>
  );
};

export default ContactLinks;

const defaultContactOptions: ContactOption[] = [
  {
    id: "1",
    label: "GitHub",
    link: "https://github.com/aravindvjn",
    icon: "github",
  },
  {
    id: "2",
    label: "WhatsApp",
    link: "https://wa.me/+917559027982",
    icon: "whatsapp",
  },
  {
    id: "3",
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/aravind-vijayan-nandanam/",
    icon: "linkedin",
  },
  {
    id: "4",
    label: "Instagram",
    link: "https://instagram.com/6windh",
    icon: "instagram",
  },
  {
    id: "5",
    label: "Email",
    link: "mailto:aravind284479@gmail.com",
    icon: "email",
  },
];
