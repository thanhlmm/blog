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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-around align-top">
        {items.map((item) => (
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 mx-auto p-2">
            <a href="#">
              <img
                className="rounded-t-lg"
                src={
                  item?.Image ||
                  "https://flowbite.com/docs/images/blog/image-1.jpg"
                }
                alt=""
              />
            </a>
            <div className="p-5">
              <a href={item.URL} target="_blank">
                <h5 className="text-gray-900 font-bold text-lg tracking-tight mb-1">
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
              <p className="font-normal text-sm text-gray-700 mb-3">
                {item.Summary}
              </p>
              {/* <a
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
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
