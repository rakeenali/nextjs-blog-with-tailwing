import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { IPost } from "../types";
import { sortByDate } from "../utils";

export const files = fs.readdirSync(path.join("posts"));

export const getPosts = () => {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data } = matter(markdownWithMeta);

    return { slug, frontmatter: data };
  }) as IPost[];

  return posts.sort(sortByDate);
};
