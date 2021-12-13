import Head from "next/head";
import { NotionAPI } from "notion-client";
import {
  NotionRenderer,
  Code,
  // Collection,
  // CollectionRow,
  Modal,
} from "react-notion-x";
import { Tweet, TwitterContextProvider } from "react-static-tweets";
import { getAllPosts, Post } from "../";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-okaidia.css";
import "react-static-tweets/styles.css";
// import CommentComponent from "../../components/comment";
import CommentV2 from "../../components/comment-v2";

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get all posts again
  const posts = await getAllPosts({ includeDraft: true });

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const notion = new NotionAPI();
  const blocks = await notion.getPage(post.id);

  return {
    props: {
      blocks,
      post,
    },
    revalidate: 60 * 1,
  };
}

const BlogPost: React.FC<{ post: Post; blocks: any }> = ({ post, blocks }) => {
  if (!post) return null;

  const ogImage = post.hero_image?.[0].url || `https://ogsupa.com/api/v1?title=${
    post.title
  }&description=${
    post.description || ""
  }&&&&background_color=%23056eaa&font_style=font-sans&left_meta=%40cuthanh15&right_meta=thanhle.blog`

  return (
    <TwitterContextProvider
      value={{
        tweetAstMap: (blocks as any).tweetAstMap || {},
        swrOptions: {
          fetcher: (id: string) =>
            fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json()),
        },
      }}
    >
      <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
        <Head>
          <title>📝 {post.title}</title>
          <meta
            property="og:image"
            content={ogImage}
          />
        </Head>
        {/* <h1 className="mb-4 text-2xl font-bold text-gray-700">{post.title}</h1> */}
        {/* <hr /> */}
        <NotionRenderer
          components={{
            code: Code,
            // collection: Collection,
            // collectionRow: CollectionRow,
            tweet: Tweet,
            modal: Modal,
          }}
          recordMap={blocks}
          fullPage={true}
          darkMode={false}
          showTableOfContents
          minTableOfContentsItems={3}
        />

        <div>
          <iframe
            src="https://thanhleblg.substack.com/embed"
            width="100%"
            height="120"
            className="mt-3 mb-3"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>

        <div>
          <CommentV2
            repo="thanhlmm/blog"
            issueTerm="pathname"
            label="comment"
            theme="github-light"
            issueMap="pathname"
          />
          {/* <CommentComponent /> */}
        </div>

        <style global jsx>{`
          .notion-hash-link {
            margin-top: 7px;
          }

          .notion-viewport {
            position: relative;
          }

          .notion-aside-table-of-contents {
            max-width: 250px;
          }

          .notion-table-of-contents-item {
            white-space: wrap;
            line-height: 1.25rem;
          }

          .notion-code {
            font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo,
              monospace !important;
          }
        `}</style>
      </div>
    </TwitterContextProvider>
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
