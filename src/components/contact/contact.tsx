import React from "react";
import Heading from "../common/heading";
import ContactForm from "./form";
import ContactLinks from "./contact-links";
import { ContactOptionItem } from "@/types/admin.type";

type Props = {
  contactOptions: ContactOptionItem[];
};
const Contact = ({ contactOptions }: Props) => {
  return (
    <div
      id="contact"
      className="p-[20px] sm:p-[40px] md:p-[60px] lg:p-[90px] text-[12px] sm:text-[14px] md:text-[16px]"
    >
      <div className="text-center">
        <Heading text="Contact" />
        <p className="opacity-60 text-[14px] md:text-[16px]">
          Whether it&#39;s about work, tech, or just a friendly chat, feel free
          to reach out!
        </p>
      </div>
      <ContactForm />
      <ContactLinks contactOptions={contactOptions} />
    </div>
  );
};

export default Contact;
