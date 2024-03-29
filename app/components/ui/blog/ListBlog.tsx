"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import { getFormatDate } from "@/lib/utils";

type Props = {
  post: BlogMeta;
};

export function ListBlog({ post }: Props) {
  const { slug, title, description, date } = post
  const formattedDate = getFormatDate(date);

  const [animatedContent, setAnimatedContent] = useState(title);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!title || title.trim().length === 0) {
        setAnimatedContent(generateRandomContent());
      }
    }, 500); 

    return () => clearInterval(interval);
  }, [title]);

 
  const generateRandomContent = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let randomContent = '';
    for (let i = 0; i < 21; i++) { 
      randomContent += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomContent;
  };
  return (
    <Link
      href={`blog/${slug}`}
      className="w-full hover:bg-zinc-900 rounded-lg duration-500 border border-zinc-800"
    >
      <li className="w-full p-4 md:p-6">
        <div className="text-zinc-400 hover:text-zinc-100 transition-colors duration-1000">
          <time className="text-xs text-zinc-50">{formattedDate}</time>
          <h1 className="text-2xl  md:text-3xl font-bold mb-6">{animatedContent}</h1>
          <p className="text-sm md:truncate">{description}</p>
        </div>
      </li>
    </Link>
  );
}
