import dayjs from "dayjs";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts, Post } from "..";

const NOTION_SERIES_ID = "add24350028a4252921600ce553f99a8";

interface ISeries {
  Name: string;
  slug: string;
  description: string;
}

export const getSeries = async (): Promise<ISeries[]> => {
  return await fetch(
    `https://notion.thanhle.workers.dev/v1/table/${NOTION_SERIES_ID}`
  ).then((res) => res.json());
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [series, posts] = await Promise.all([
    getSeries(),
    getAllPosts({ locale }),
  ]);

  const seriesWithPost = series
    .map((list) => {
      return {
        ...list,
        posts: posts.filter((post) => post?.series?.includes(list.slug)),
      };
    })
    .filter((list) => list.posts.length > 0);

  return {
    props: {
      series: seriesWithPost,
    },
    revalidate: 60 * 5,
  };
};

interface ISeriesProps {
  series: (ISeries & {
    posts: Post[];
  })[];
}

const Series: React.FC<ISeriesProps> = ({ series }) => {
  console.log(series);
  return (
    <div className="max-w-5xl p-2 mx-auto mt-4">
      <Head>
        <title>📽 Series</title>
        <meta
          name="description"
          content="I put some of my posts in series so you can read it with more context 🥰"
        />
      </Head>
      <div className="mt-4 mb-6 text-gray-700 dark:text-gray-100">
        I put some of my posts in series so you can read it with more context 🥰
      </div>
      {series.map((list) => (
        <div key={list.slug}>
          <h3
            className="mt-10 mb-3 text-lg font-semibold text-gray-700 dark:text-gray-100"
            id="engineer"
          >
            {list.Name}
          </h3>
          <div className="mb-4 text-gray-700 dark:text-gray-100">
            {list.description}
          </div>
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {list.posts.map((post) => (
              <li className="mb-4 ml-3" key={post.id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-100">
                  {dayjs(post.date, "YYYY-MM-DD").format("MMM DD, YYYY")}
                </time>
                <Link href={`/blog/${post.slug}`} locale={post.lang}>
                  <a>
                    <h3 className="mb-1 font-medium text-blue-600 dark:text-blue-500">
                      {post.title}
                    </h3>
                  </a>
                </Link>
                <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {post.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default Series;
