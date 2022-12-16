import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { NotionAPI } from "notion-client";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from "react-notion-x";
import TweetEmbed from "react-tweet-embed";
import "react-notion-x/src/styles.css";
// import "./style.css";
// import { Tweet, TwitterContextProvider } from "react-static-tweets";
// import "react-static-tweets/styles.css";
import { getAllPosts, Post } from "../";
// import ReactGiscus from "../../components/comment-v3";

import dynamic from "next/dynamic";
import dayjs from "dayjs";
// import { useRouter } from "next/router";

const ReactGiscus = dynamic(() => import("../../components/comment-v3"), {
  ssr: false,
  loading: () => <p>Loading Comments...</p>,
});

const Code = dynamic(async () => {
  const m = await import("react-notion-x/build/third-party/code");
  return m.Code;
});

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

const TweetRender = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />;
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // Get all posts again
  const posts = await getAllPosts({ locale: "", includeDraft: true });

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const notion = new NotionAPI();
  const blocks = await notion.getPage(post.id);

  if (post.lang !== locale) {
    // return {
    //   redirect: {
    //     destination: `${locale === "vi" ? "/" : "/en"}/blog/${post.slug}`,
    //     permanent: true,
    //   },
    // };
  }

  return {
    props: {
      blocks,
      post,
    },
    revalidate: 60 * 1,
  };
};

const BlogPost: React.FC<{ post: Post; blocks: any }> = ({ post, blocks }) => {
  // const router = useRouter();
  // const { locale } = router;
  if (!post) return null;

  const ogImage =
    post.hero_image?.[0].url ||
    `https://thanhle.blog/api/og?title=${encodeURI(
      post.title
    )}&description=${encodeURI(
      post.description || ""
    )}&publishedDate=${encodeURI(
      dayjs(post.date, "YYYY-MM-DD").format("MMM DD, YYYY")
    )}`;

  return (
    // <TwitterContextProvider
    //   value={{
    //     tweetAstMap: (blocks as any).tweetAstMap || {},
    //     swrOptions: {
    //       fetcher: (id: string) =>
    //         fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json()),
    //     },
    //   }}
    // >
    // </TwitterContextProvider>
    <div className="px-4 mx-auto mt-10 font-sans sm:px-6 lg:px-8">
      <Head>
        <title>📝 {post.title}</title>
        <meta property="og:image" content={ogImage} />
        <meta name="description" content={post?.description} />
        <meta property="og:description" content={post?.description} />
      </Head>
      {/* <h1 className="mb-4 text-2xl font-bold text-gray-700">{post.title}</h1> */}
      {/* <hr /> */}
      {post.linkRelatived && (
        <div className="text-center">
          {post.lang === "en"
            ? "Xem bài này ở Tiếng Việt:"
            : "View this post in English:"}
          <Link
            href={`/blog/${post.linkRelatived}`}
            locale={post.lang === "en" ? "vi" : "en"}
            legacyBehavior>
            <a className="text-indigo-700">
              {" "}
              https://thanhle.blog/blog/{post.linkRelatived}
            </a>
          </Link>
        </div>
      )}

      <article>
        <NotionRenderer
          components={{
            Code,
            // collection: Collection,
            // collectionRow: CollectionRow,
            nextImage: Image,
            nextLink: Link,
            Tweet: TweetRender,
            Modal,
          }}
          recordMap={blocks}
          fullPage={true}
          darkMode={false}
          showTableOfContents
          minTableOfContentsItems={3}
        />
      </article>

      <div>
        <iframe
          src="https://thanhleblg.substack.com/embed"
          width="100%"
          height="250"
          className="mt-3 mb-3"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
        ></iframe>
      </div>

      <div className="max-w-5xl mx-auto">
        <ReactGiscus
          repo="thanhlmm/blog"
          repoId="R_kgDOGOslWw"
          category="Ideas"
          categoryId="DIC_kwDOGOslW84CAR_K"
          dataMapping="specific"
          dataTerm={() =>
            `${window.location.hostname}/${
              post.lang === "vi" ? post.slug : `${post.lang}/${post.slug}}`
            }`
          }
          // dataTerm={window.location.hostname + window.location.pathname}
          theme="preferred_color_scheme"
        />
        {/* <CommentV2
            repo="thanhlmm/blog"
            issueTerm="pathname"
            label="comment"
            theme="github-light"
            issueMap="pathname"
          /> */}
        {/* <CommentComponent /> */}
      </div>

      <style global jsx>{`
        .notion {
          font-size: 18px;
          font-family: ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol", "Noto Color Emoji";
        }

        .notion img {
          position: relative;
        }

        .notion img::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
        }

        .notion-list li {
          padding-top: 2px;
        }

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

        .notion-asset-caption {
          text-align: center;
          width: 100%;
        }

        .notion-list {
          overflow: hidden;
          width: 100%;
        }

        .notion-bookmark-title {
          font-weight: 500;
        }

        .notion-to-do {
          margin-left: 16px;
        }

        .dark .notion {
          --fg-color: rgba(255, 255, 255, 0.9);
          --fg-color-0: var(--fg-color);
          --fg-color-1: var(--fg-color);
          --fg-color-2: var(--fg-color);
          --fg-color-3: var(--fg-color);
          --fg-color-4: var(--fg-color);
          --fg-color-5: rgba(255, 255, 255, 0.7);
          --fg-color-6: #fff;
          --fg-color-icon: #fff;

          --bg-color: #18181b;
          --bg-color-0: rgb(71, 76, 80);
          --bg-color-1: rgb(63, 68, 71);
          --bg-color-2: rgba(135, 131, 120, 0.15);

          --notion-red: rgb(255, 115, 105);
          --notion-pink: rgb(226, 85, 161);
          --notion-blue: rgb(82, 156, 202);
          --notion-purple: rgb(154, 109, 215);
          --notion-teal: rgb(77, 171, 154);
          --notion-yellow: rgb(255, 220, 73);
          --notion-orange: rgb(255, 163, 68);
          --notion-brown: rgb(147, 114, 100);
          --notion-gray: rgba(151, 154, 155, 0.95);
          --notion-red_background: rgb(89, 65, 65);
          --notion-pink_background: rgb(83, 59, 76);
          --notion-blue_background: rgb(54, 73, 84);
          --notion-purple_background: rgb(68, 63, 87);
          --notion-teal_background: rgb(53, 76, 75);
          --notion-yellow_background: rgb(89, 86, 59);
          --notion-orange_background: rgb(89, 74, 58);
          --notion-brown_background: rgb(67, 64, 64);
          --notion-gray_background: rgb(69, 75, 78);
          --notion-red_background_co: rgba(89, 65, 65, 0.3);
          --notion-pink_background_co: rgba(83, 59, 76, 0.3);
          --notion-blue_background_co: rgba(120, 162, 187, 0.3);
          --notion-purple_background_co: rgba(68, 63, 87, 0.3);
          --notion-teal_background_co: rgba(53, 76, 75, 0.3);
          --notion-yellow_background_co: rgba(89, 86, 59, 0.3);
          --notion-orange_background_co: rgba(89, 74, 58, 0.3);
          --notion-brown_background_co: rgba(67, 64, 64, 0.3);
          --notion-gray_background_co: rgba(69, 75, 78, 0.3);
        }
      `}</style>
    </div>
  );
};

export async function getStaticPaths({ locale }: { locale: any }) {
  const table = await getAllPosts({ locale });
  return {
    paths: table.map((row) => `/blog/${row.slug}`),
    fallback: "blocking",
  };
}

export default BlogPost;
