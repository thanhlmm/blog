import Head from "next/head";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { getAllPosts, Post } from "../";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const notion = new NotionAPI();
  const blocks = await notion.getPage(post.id);

  return {
    props: {
      blocks,
      post,
    },
    revalidate: 60 * 5,
  };
}

const BlogPost: React.FC<{ post: Post; blocks: any }> = ({ post, blocks }) => {
  if (!post) return null;

  return (
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
      <Head>
        <title>📝 {post.title}</title>
        <meta
          property="og:image"
          content={`https://ogsupa.com/api/v1?title=${post.title}description=${
            post.description || ""
          }&background_color=%23056eaa&font_style=font-sans&left_meta=%40cuthanh15&right_meta=thanhle.blog`}
        />
      </Head>
      <h1 className="mb-4 text-2xl font-bold text-gray-700">{post.title}</h1>
      <hr />
      <NotionRenderer recordMap={blocks} fullPage={false} darkMode={false} />
      <style global jsx>{`
        .notion-hash-link {
          margin-top: 7px;
        }
      `}</style>
    </div>
  );
};

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/blog/${row.slug}`),
    fallback: "blocking",
  };
}

export default BlogPost;
