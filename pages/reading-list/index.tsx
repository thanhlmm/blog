import Head from "next/head";

const NOTION_READING_LIST_ID =
  process.env.NOTION_READING_LIST_ID || "7c547405f812444f85ea8a913a9816db";

interface ReadingList {
  id: string;
  NotionId: string;
  "Date added": string;
  Summary: string;
  URL: string;
  Tags?: string[];
  Title: string;
  Image?: string;
  SiteMetadata: string;
}

export const getAllReadingList = async (): Promise<ReadingList[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_READING_LIST_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  // Get all posts again
  const items = await getAllReadingList();

  return {
    props: {
      items,
    },
    revalidate: 60 * 5,
  };
}

function BlogList({ items }: { items: ReadingList[] }) {
  return (
    <div className="container mx-auto mt-10">
      <Head>
        <title>📚 Reading list</title>
      </Head>
      <div className="grid justify-around grid-cols-1 gap-4 gap-x-8 px-2 align-top md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div className="w-full mx-auto mb-5 bg-white border border-gray-200 rounded-lg shadow-md">
            <a href={item.URL} target="_blank">
              <img
                className="w-full h-56 rounded-t-lg object-cover"
                loading="lazy"
                src={
                  item?.Image ||
                  "https://flowbite.com/docs/images/blog/image-1.jpg"
                }
                alt=""
              />
            </a>
            <div className="p-5">
              <a href={item.URL} target="_blank">
                <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900">
                  {item.Title}
                </h5>
              </a>
              <div className="mb-1 space-x-1">
                {(item?.Tags || []).map((tag) => (
                  <span className="rounded text-sm text-white bg-blue-600 px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-3 text-sm font-normal text-gray-700">
                {item.Summary}
              </p>
              {/* <a
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                href="#"
              >
                Read more
              </a> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
