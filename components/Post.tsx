import Image from "next/image";
import Link from "next/link";

import { IPost } from "../types";
import CategoryLabel from "./CategoryLabel";

type Props = {
  post: IPost;
};

const Post: React.FC<Props> = ({ post }) => {
  const { frontmatter } = post;

  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={frontmatter.cover_image}
        alt=""
        height={420}
        width={600}
        className="mb-4 rounded"
      />

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{frontmatter.date}</span>
        <CategoryLabel category={frontmatter.category} />
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bol hover:underline">
            {frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{frontmatter.excerpt}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>
        <div className="flex items-center">
          <img
            src={frontmatter.author_image}
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          />
          <h3 className="text-gray-700 font-bold">{frontmatter.author}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
