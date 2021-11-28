import { IPost } from "../types";

export const sortByDate = (a: any, b: any): number => {
  // @ts-ignore
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};
