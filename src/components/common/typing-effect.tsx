"use client";
import { useEffect, useState } from "react";

const TypingEffect = ({ words }: { words: string[] }) => {

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (!isDeleting && text === currentWord) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      },
      isDeleting ? 20 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span className="font-bold text-blue-500">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypingEffect;
