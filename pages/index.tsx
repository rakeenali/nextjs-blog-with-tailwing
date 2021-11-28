import type { GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

import Layout from "../components/Layout";
import { IPost } from "../types";
import Post from "../components/Post";
import { sortByDate } from "../utils";

type Props = {
  posts: IPost[];
};

const HomePage: NextPage<Props> = ({ posts }) => {
  //
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Post key={post.slug} {...{ post }} />
        ))}
      </div>

      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          All Posts
        </a>
      </Link>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data } = matter(markdownWithMeta);

    return { slug, frontmatter: data };
  }) as IPost[];

  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6),
    },
  };
};

export default HomePage;
