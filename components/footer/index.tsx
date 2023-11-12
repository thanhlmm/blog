// import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showBanner, toogleShowBanner] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     toogleShowBanner(true);
  //   }, 1000);
  // }, []);

  return (
    <>
      <div className="p-6">
        <p className="text-center">
          Follow me{" "}
          <a
            href="https://twitter.com/thanhledev"
            className="text-blue-600"
            target="_blank"
          >
            @thanhledev
          </a>
        </p>
      </div>
      <div
        className={[
          "fixed z-50 inset-x-0 pb-2 sm:pb-5 transition-all",
          showBanner ? "bottom-0 opacity-100" : "bottom-[-30px] opacity-0",
        ].join(" ")}
      >
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-1 bg-white border border-green-500 rounded-lg shadow-lg dark:bg-gray-700 border-1 sm:p-2">
            <div className="flex flex-col flex-wrap items-center justify-between md:flex-row">
              <div className="flex items-center flex-1 mx-3 my-2">
                <span className="hidden p-1 text-2xl rounded-lg md:flex">
                  🥺
                </span>
                <p className="font-medium text-green-600 md:ml-3">
                  <span>
                    Xin lỗi các bạn vì thời gian qua mình không dành thời gian
                    viết nhiều. Dạo này mình khá bận cho dự án{" "}
                    <a
                      className="text-blue-700 "
                      href="https://getnimbus.io"
                      target="_blank"
                    >
                      https://getnimbus.io
                    </a>
                    . Check it out 🥳
                  </span>
                </p>
              </div>
              <div className="flex-shrink-0 order-2 my-1 mr-2 sm:order-3 sm:ml-2 md:mt-0">
                <a
                  type="button"
                  href="https://getnimbus.io"
                  target="_blank"
                  className="flex p-2 -mr-1 text-white bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Xem thử
                </a>
                {/* <button
                    type="button"
                    className="flex p-2 -mr-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => toogleShowBanner(false)}
                  >
                    <span className="sr-only">Dismiss</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
