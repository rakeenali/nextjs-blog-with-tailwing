import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs";

import Layout from "../../../components/Layout";
import { IPost } from "../../../types";
import Post from "../../../components/Post";
import { POSTS_PER_PAGE } from "../../../config";
import Pagination from "../../../components/Pagination";
import { getPosts } from "../../../lib/post";
import CategoryList from "../../../components/CategoryList";

type Props = {
  posts: IPost[];
  numPages: number;
  categories: string[];
  currentPage: number;
};

const BlogPageIndex: NextPage<Props> = ({
  posts,
  numPages,
  currentPage,
  categories,
}) => {
  //
  return (
    <Layout title="Blogs">
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Post key={`BlogPageIndex-${post.slug}`} {...{ post }} />
            ))}
          </div>
          <Pagination {...{ currentPage, numPages }} />
        </div>
        <div className="w-1/4">
          <CategoryList {...{ categories }} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts();

  // Get Categories
  const categories = posts.map((post) => {
    return post.frontmatter.category;
  });

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: [...new Set(categories)],
    },
  };
};

export const getStaticPaths: GetStaticPaths = (context) => {
  const files = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: {
        page_index: i.toString(),
      },
    });
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export default BlogPageIndex;
