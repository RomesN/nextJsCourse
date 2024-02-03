import matter from "gray-matter";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  return { slug: postSlug, ...data, content: content };
}

export function getAllPosts() {
  return getPostsFiles()
    .map((p) => getPostData(p))
    .sort((pA, pB) => (pA.date > pB.date ? -1 : 1));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.isFeatured);
}
