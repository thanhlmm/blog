import Head from "next/head";
import React, { useEffect, useMemo, useRef, useState } from "react";
import _debounce from "lodash-es/debounce";
import _uniqBy from "lodash-es/uniqBy";
import { Switch } from "@headlessui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const fetchReadingList = (page = 0, search = "type:article") =>
  fetch(
    `https://api.raindrop.io/rest/v1/raindrops/0?search=${encodeURIComponent(
      search
    )}&sort=-created&perpage=50&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_KEY}`,
      },
    }
  ).then((res) => res.json());

function BlogList() {
  const [keyword, setKeyword] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [enabledEditor, setEnabledEditor] = useState(false);
  const { isLoading, data, fetchNextPage } = useInfiniteQuery(
    ["readinglist", keyword],
    ({ pageParam, queryKey }) => {
      return fetchReadingList(pageParam || 0, queryKey[1]);
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length;
      },
    }
  );

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

  const handleChangeKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // @ts-ignore
      setKeyword(e.target?.value);
    }
  };

  const readingList = useMemo(() => {
    console.log(data?.pages || []);
    return (data?.pages || []).reduce((prev, curPage) => {
      return [...prev, ...curPage.items];
    }, []);
  }, [data]);

  useEffect(() => {
    // This is bad to use useEffect to change the keyword. But i'm too lazy :)
    setKeyword(enabledEditor ? '"#must read"' : "");
    // @ts-ignore
    searchInputRef.current?.value = enabledEditor ? '"#must read"' : "";
  }, [enabledEditor]);

  console.log({ keyword });

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
            // value={keyword}
            onKeyPress={handleChangeKeyword}
            placeholder="Quick search"
            className="block w-full p-3 pr-12 text-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-100"
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
              enabledEditor ? "bg-blue-600" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Must read
            </span>
          </Switch.Label>
        </Switch.Group>
      </div>

      {isLoading && (
        <div className="flex justify-center my-20">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="grid justify-around grid-cols-1 gap-4 px-2 align-top gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {readingList.map((item) => (
          <div className="w-full mx-auto mb-5 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
            <a href={item.link} target="_blank">
              <img
                className="object-cover w-full h-56 rounded-t-lg"
                loading="lazy"
                src={
                  item?.cover ||
                  "https://flowbite.com/docs/images/blog/image-1.jpg"
                }
                alt=""
              />
            </a>
            <div className="p-5">
              <a href={item.link} target="_blank">
                <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </a>
              <div className="mb-1 space-x-1">
                {(item?.tags || [])
                  .filter((tag) => tag !== "must read")
                  .map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              {(item?.tags || []).includes("must read") && (
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
              <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-300 line-clamp-3">
                {item.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          onClick={() => fetchNextPage()}
          disabled={isLoading}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

export default BlogList;
