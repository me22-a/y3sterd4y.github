import fs from "fs/promises";
import path from "path";

import { remark } from "remark";
import { notFound } from "next/navigation";

import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";

const projectsDir = path.join(process.cwd(), "/app/content/projects/");
const blogsDir = path.join(process.cwd(), "/app/content/blog/");

export async function getSortedPosts() {
  try {
    const projectFileNames = await fs.readdir(projectsDir);
    const blogFileNames = await fs.readdir(blogsDir);

    const projectPosts = await Promise.all(
      projectFileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");

        const fullPath = path.join(projectsDir, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");

        const matterResult = matter(fileContents);

        const projectPost: ProjectPost = {
          slug,
          title: matterResult.data.title,
          description: matterResult.data.description,
          date: matterResult.data.date,
          repository: matterResult.data.repository,
          url: matterResult.data.url,
        };

        return projectPost;
      })
    );

    const blogPosts = await Promise.all(
      blogFileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");

        const fullPath = path.join(blogsDir, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");

        const matterResult = matter(fileContents);

        const blogPost: BlogPost = {
          slug,
          title: matterResult.data.title,
          description: matterResult.data.description,
          date: matterResult.data.date,
          published: matterResult.data.published,
        };

        return blogPost;
      })
    );

    return {
      projectPosts: projectPosts.sort((a, b) => (a.date < b.date ? 1 : -1)),
      blogPosts: blogPosts.sort((a, b) => (a.date < b.date ? 1 : -1)),
    };
  } catch (error) {
    console.error("Error reading or processing posts:", error);
    throw error;
  }
}

export async function getProjectPost(slug: string) {
  const baseDir = projectsDir;
  const fileExtension = ".md"; // Adjust the extension if needed

  const fullPath = path.join(baseDir, `${slug}${fileExtension}`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    console.log(contentHtml);

    if (!contentHtml) {
      notFound();
    }

    const PostWithHTML: ProjectPost & { contentHtml: string } = {
      slug,
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
      repository: matterResult.data.repository,
      url: matterResult.data.url,
      contentHtml,
    };
    return PostWithHTML;
  } catch (error) {
    console.error("Error reading or processing post:", error);
    notFound();
  }
}

export async function getBlogPost(slug: string) {
  const baseDir = blogsDir;
  const fileExtension = ".md"; // Adjust the extension if needed

  const fullPath = path.join(baseDir, `${slug}${fileExtension}`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // if (!contentHtml) {
    //   notFound();
    // }

    const PostWithHTML: BlogPost & { contentHtml: string } = {
      slug,
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
      published: matterResult.data.published,
      contentHtml,
    };
    return PostWithHTML;
  } catch (error) {
    console.error("Error reading or processing post:", error);
    notFound();
  }
}
