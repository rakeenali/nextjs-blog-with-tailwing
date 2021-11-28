import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

import CategoryList from "../../../components/CategoryList";
import Layout from "../../../components/Layout";
import { IPost } from "../../../types";
import Post from "../../../components/Post";
import { getPosts } from "../../../lib/post";

type Props = {
  posts: IPost[];
  categoryName: string;
  categories: string[];
};

const CategoryNamePage: NextPage<Props> = ({
  posts,
  categoryName,
  categories,
}) => {
  //
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">{categoryName}</h1>

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
        </div>
        <div className="w-1/4">
          <CategoryList {...{ categories }} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data } = matter(markdownWithMeta);

    return data.category.toLowerCase();
  });

  const paths = categories.map((c) => ({
    params: {
      category_name: c,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryName = context.params?.category_name || "";

  const posts = getPosts();
  const categories = posts.map((post) => {
    return post.frontmatter.category;
  });

  // Filter post by category
  const categoryPosts = posts.filter((post) => {
    return (
      // @ts-ignore
      post.frontmatter.category.toLowerCase() === categoryName.toLowerCase()
    );
  });

  return {
    props: {
      posts: categoryPosts,
      categoryName,
      categories: [...new Set(categories)],
    },
  };
};

export default CategoryNamePage;
