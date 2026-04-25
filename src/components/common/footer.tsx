"use client";

import React, { useEffect, useState } from "react";

const Footer = () => {
  const [domain, setDomain] = useState(process.env.NEXT_PUBLIC_SITE_URL || "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.host);
    }
  }, []);

  return (
    <div className="text-center mt-[50px] mb-[10px] font-light text-[12px] md:text-[14px]">
      <p className="cursor-pointer opacity-50 hover:opacity-100 hover:text-purple-400">
        &copy;{new Date().getFullYear()}.{" "}
        {domain || process.env.NEXT_PUBLIC_SITE_URL || "aravindvijayan.in"}
      </p>
    </div>
  );
};

export default Footer;
