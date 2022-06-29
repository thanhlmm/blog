import Link from "next/link";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";
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

      <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-900"
        >
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <a className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate dark:text-blue-500">
                            {post.title}
                          </p>
                        </div>
                        <div className="mt-1 space-x-1">
                          {post.tag?.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex mt-2">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-100">
                            <CalendarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-200"
                              aria-hidden="true"
                            />
                            <p>
                              <time dateTime={post.date}>{post.date}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                        <div className="flex -space-x-1 overflow-hidden">
                          {/* <Image
                          src="/me.jpeg"
                          alt="me"
                          className="rounded-md"
                          width="40"
                          height="40"
                        /> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-5">
                      <ChevronRightIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
