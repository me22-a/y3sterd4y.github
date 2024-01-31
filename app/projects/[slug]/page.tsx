import Navigater from "@/components/ui/navigater";
import getFormattedDate from "@/lib/getFomattedDate";
import { getSortedPosts, getProjectPost } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  const { projectPosts } = await getSortedPosts();

  const projectSlugs = projectPosts.map((post) => ({
    params: {
      slug: post.id,
    },
  }));

  return [...projectSlugs]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { projectPosts } = await getSortedPosts();
  const { slug } = params;

  const projectPost = projectPosts.find((post) => post.id === slug);

  if (!projectPost) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: projectPost.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { title, date, subtitle, repository, url, contentHtml } = await getProjectPost(
    slug
  );
  const pubDate = getFormattedDate(date);

  return (
    <div className="min-h-screen bg-white">
      <Navigater Href="/projects" />
      <div className="w-full bg-black">
        <div className="py-24 sm:py-26 flex flex-col justify-center items-center text-center bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
          <div className=" px-6 flex flex-col ">
            <time className="mb-6 text-lg  text-zinc-300">{pubDate}</time>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">{subtitle}</p>
          </div>
          <div className="mt-8 font-semibold space-x-7">
            {repository && (
              <Link
                href={repository}
                target="_blank"
                className="after:content-['_↗']"
              >
                Github
              </Link>
            )}
            {url && (
              <Link href={url} target="_blank" className="after:content-['_↗']">
                Website
              </Link>
            )}
          </div>
        </div>
        <div className="bg-white">
          <div className="">
            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
              <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
