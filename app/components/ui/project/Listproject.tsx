import Link from "next/link";

import { getFormatDate } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  description?: string;
  date: string;
};


export default function Listproject({ slug, title, description, date }: Props) {
  const formattedDate = getFormatDate(date);

  return (
    <li className="w-full md:w-[345px] p-6 border border-zinc-600 rounded-xl">
      <Link href={`projects/${slug}`}>
        <div className="text-zinc-400 hover:text-zinc-100 transition-colors duration-1000">
          {formattedDate ? (
            <time className="text-xs text-zinc-50">{formattedDate}</time>
          ) : (
            <span className="text-xs text-zinc-50 font-semibold">SOON</span>
          )}
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <p className="text-sm md:truncate">{description}</p>
        </div>
      </Link>
    </li>
  );
}
