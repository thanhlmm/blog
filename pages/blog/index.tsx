import Head from "next/head";
import Link from "next/link";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { getAllPosts, Post } from "../";

export async function getStaticProps() {
  // Get all posts again
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60 * 5,
  };
}

function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
      <Head>
        <title>📝 Blog</title>
      </Head>
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
                            <span className="rounded text-sm text-white bg-blue-600 px-2 py-0.5">
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

export default BlogList;
