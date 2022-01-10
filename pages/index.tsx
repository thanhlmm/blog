import Link from "next/link";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import { GetStaticProps } from "next";

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
        .filter((row: Post) =>
          includeDraft ? true : row.status === "Published"
        )
        .filter((row: Post) => (locale ? row.lang === locale : true))
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
      <iframe
        src="https://thanhleblg.substack.com/embed"
        width="100%"
        height="250"
        className="mb-8"
        frameBorder="0"
        scrolling="no"
      ></iframe>

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <a className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">
                            {post.title}
                          </p>
                        </div>
                        <div className="mt-1 space-x-1">
                          {post.tag.map((tag) => (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
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
