import { GetStaticProps } from "next";
import { getAllPosts } from "../";
import HomePage from "../index";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Get all posts again
  const posts = await getAllPosts({ locale });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 5,
  };
};

export default HomePage;
