export interface IPost {
  frontmatter: IFrontMatter;
  slug: string;
  content: string;
}

interface IFrontMatter {
  author: string;
  author_image: string;
  category: string;
  cover_image: string;
  date: string;
  excerpt: string;
  title: string;
}
