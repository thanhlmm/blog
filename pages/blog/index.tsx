import Image from "next/image";
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
  };
}

function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <a className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">
                            {post.title}
                          </p>
                        </div>
                        <div className="space-x-1 mt-1">
                          {post.tag.map((tag) => (
                            <span className="rounded text-sm text-white bg-blue-600 px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 flex">
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
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden -space-x-1">
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
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
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
