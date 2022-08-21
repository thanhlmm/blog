import Link from "next/link";
import dayjs from "dayjs";
import { GetStaticProps } from "next";
import Head from "next/head";

const NOTION_BLOG_ID =
  process.env.NOTION_BLOG_ID || "c0a9456d6fa04bb2af554a310ac7b5ff";

type PostStatus = "Published" | "Draft";
export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  tag: string[];
  status: PostStatus;
  lang: "en" | "vi";
  description?: string;
  linkRelatived?: string;
  hero_image: {
    url: string;
  }[];
};

export const getAllPosts = async ({
  locale = "",
  includeDraft = false,
}): Promise<Post[]> => {
  return await fetch(
    `https://notion.thanhle.workers.dev/v1/table/${NOTION_BLOG_ID}`
  )
    .then((res) => res.json())
    .then((res) =>
      res
        .filter((row: Post) => includeDraft || row.status === "Published")
        .filter((row: Post) => {
          return locale
            ? row.linkRelatived
              ? row.lang === locale
              : true
            : true;
        })
        .sort(
          (a: Post, b: Post) =>
            dayjs(b.date, "YYYY-MM-DD").unix() -
            dayjs(a.date, "YYYY-MM-DD").unix()
        )
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getAllPosts({ locale });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 5,
  };
};

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
      <Head>
        <meta
          name="description"
          content="I share about Frontend, Engineer and some thought in product and life."
        />
      </Head>
      {/* <iframe
        src="https://thanhleblg.substack.com/embed"
        width="100%"
        height="250"
        className="mb-8"
        frameBorder="0"
        scrolling="no"
        loading="lazy"
      ></iframe> */}

      <h2 className="mb-2 text-xl font-semibold">Posts</h2>
      <div className="mb-8 text-gray-700 dark:text-gray-100">
        I share about Frontend, Engineer and some thought in product and life 😴
      </div>

      <div className="overflow-hidden">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative transition-all bg-white border border-gray-200 hover:border-blue-400 dark:hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800"
            >
              {dayjs(post.date, "YYYY-MM-DD").isAfter(
                dayjs().subtract(14, "d")
              ) && <div className="absolute text-xl top-2 right-2">✨</div>}
              <Link href={`/blog/${post.slug}`} locale={post.lang}>
                <a className="block">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center mb-2 text-xs text-gray-500 dark:text-gray-100">
                      <time dateTime={post.date}>
                        {dayjs(post.date, "YYYY-MM-DD").format("MMM DD, YYYY")}
                      </time>
                    </div>
                    <div className="flex text-sm">
                      <p className="mb-3 font-medium text-blue-600 dark:text-blue-500">
                        {post.title}
                      </p>
                    </div>
                    <div className="space-x-1">
                      {post.tag?.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
