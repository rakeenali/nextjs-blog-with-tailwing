// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { files } from "../../lib/post";
import { IFrontMatter } from "../../types";

type Data = string;

type IPosts = {
  frontmatter: IFrontMatter;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let posts: IPosts[];

  if (process.env.NODE_ENV === "production") {
    //@todo - fetch from cache
    posts = [];
  } else {
    posts = files.map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );

      const { data } = matter(markdownWithMeta);

      return { frontmatter: data, slug };
    }) as any;
  }

  const queryString = (req.query.q as string) || "";

  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(queryString) != -1 ||
      excerpt.toLowerCase().indexOf(queryString) != -1 ||
      category.toLowerCase().indexOf(queryString) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
}
