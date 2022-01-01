import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import _debounce from "lodash-es/debounce";
import _uniqBy from "lodash-es/uniqBy";
import { Switch } from "@headlessui/react";

const NOTION_READING_LIST_ID =
  process.env.NOTION_READING_LIST_ID || "7c547405f812444f85ea8a913a9816db";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

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
  editor_choice?: boolean;
}

export const getAllReadingList = async (): Promise<ReadingList[]> => {
  return await fetch(
    `https://notion.refiapp.workers.dev/v1/table/${NOTION_READING_LIST_ID}`
  )
    .then((res) => res.json())
    .then((data) => _uniqBy(data as any[], "URL"));
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
  const [keyword, setKeyword] = useState("");
  const [itemFiltered, setResult] = useState<ReadingList[]>(items);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [enabledEditor, setEnabledEditor] = useState(false);

  const getFilterResult = _debounce((keyword: string) => {
    setResult(
      items.filter((item) => {
        if (!keyword) {
          return true;
        }

        const keywordLowerCase = keyword.toLowerCase();

        if (item.Title.toLowerCase().includes(keywordLowerCase)) {
          return true;
        }

        if (item.Summary.toLowerCase().includes(keywordLowerCase)) {
          return true;
        }

        if (
          item.Tags?.map((tag) => tag.toLowerCase()).includes(keywordLowerCase)
        ) {
          return true;
        }

        return false;
      })
    );
  }, 300);

  useEffect(() => {
    const searchShortCut = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.code) {
          case "KeyK":
            searchInputRef.current?.focus();
            break;
        }
      }
    };
    document.addEventListener("keydown", searchShortCut);
    return () => {
      document.removeEventListener("keydown", searchShortCut);
    };
  }, []);

  const handleChangeKeyword = (keyword: string) => {
    setKeyword(keyword);
    getFilterResult(keyword);
  };

  const readingList = useMemo(() => {
    return itemFiltered.filter((item) =>
      enabledEditor ? item.editor_choice : true
    );
  }, [itemFiltered, enabledEditor]);

  return (
    <div className="container mx-auto mt-10">
      <Head>
        <title>📚 Reading list</title>
      </Head>

      <div className="flex flex-col items-center w-full px-2 mx-auto my-6 mt-2 md:w-1/2 md:flex-row">
        <div className="relative items-center w-full">
          <input
            type="text"
            name="search"
            id="search"
            ref={searchInputRef}
            value={keyword}
            onChange={(e) => handleChangeKeyword(e.target.value)}
            placeholder="Quick search"
            className="block w-full p-3 pr-12 text-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        <Switch.Group as="div" className="flex items-center mt-4 ml-4 md:mt-0">
          <Switch
            checked={enabledEditor}
            onChange={setEnabledEditor}
            className={classNames(
              enabledEditor ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabledEditor ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3">
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
              Must read
            </span>
          </Switch.Label>
        </Switch.Group>
      </div>

      <div className="grid justify-around grid-cols-1 gap-4 px-2 align-top gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {readingList.map((item) => (
          <div className="w-full mx-auto mb-5 bg-white border border-gray-200 rounded-lg shadow-md">
            <a href={item.URL} target="_blank">
              <img
                className="object-cover w-full h-56 rounded-t-lg"
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
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    {tag}
                  </span>
                ))}
              </div>
              {item.editor_choice && (
                <div className="flex items-center mb-2 text-sm font-semibold text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-5 h-5 mr-1 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Must read
                </div>
              )}
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
