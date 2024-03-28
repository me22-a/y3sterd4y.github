import { getProjectMeta } from "@/lib/posts";
import Listproject from "./Listproject";

export default async function ProjectPosts() {
  const posts = await getProjectMeta();

  return (
    <div className="">
      <ul className="my-16 w-full flex flex-wrap justify-betdween gap-5">
        {posts.map((post) => (
          <Listproject key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
