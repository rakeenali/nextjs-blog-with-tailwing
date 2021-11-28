import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

import Layout from "../../components/Layout";
import CategoryLabel from "../../components/CategoryLabel";
import { IPost } from "../../types";

interface Props extends IPost {}

const PostPage: NextPage<Props> = ({ frontmatter, content, slug }) => {
  const htmlContent = marked.parse(content);

  return (
    <Layout title={frontmatter.title}>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{frontmatter.title}</h1>
          <CategoryLabel category={frontmatter.category} />
        </div>
        <img src={frontmatter.cover_image} alt="" className="w-full rounded" />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8 rounded">
          <div className="flex items-center rounded">
            <img
              src={frontmatter.author_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{frontmatter.author}</h4>
          </div>
          <div className="mr-4">{frontmatter.date}</div>
        </div>

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter: data,
      slug: slug,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename.replace(".md", ""),
      },
    };
  });

  return { paths: paths, fallback: false };
};

export default PostPage;
