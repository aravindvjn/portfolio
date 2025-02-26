"use client";
import { sendEmailAction } from "@/lib/actions/email-action";
import React, { useActionState } from "react";

const ContactForm = () => {
  
  const inputClasses =
    "w-full p-3 border bg-background border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-[7px]";

  const [state, formAction, isPending] = useActionState(sendEmailAction, {
    message: "",
    success: false,
  });

  return (
    <form action={formAction} className="flex flex-col md:w-1/2 gap-4 py-6">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          required
          defaultValue={state.data?.email}
          name="email"
          type="email"
          placeholder="Your Email Address"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          defaultValue={state.data?.content}
          name="content"
          placeholder="Your Message"
          rows={5}
          required
          className={inputClasses}
        />
      </div>

      {state.message && (
        <p className={state.success ? "text-green-500" : "text-red-500"}>
          {state.message}
        </p>
      )}

      <button
        disabled={isPending}
        type="submit"
        className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
