import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Footer = () => {
  const [showBanner, toogleShowBanner] = useState(true);

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
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="p-1 rounded-lg shadow-lg bg-amber-500 sm:p-2">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-1 w-0">
                  <span className="flex p-1 text-2xl rounded-lg bg-amber-500">
                    🤓
                  </span>
                  <p className="ml-3 font-medium text-white">
                    <span>
                      Sắp tới mình sẽ viết 2 tuần một bài để focus sâu hơn vào
                      nội dung. Hy vọng mọi người vẫn ủng hộ nhé!
                    </span>
                  </p>
                </div>
                <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className="flex p-2 -mr-1 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => toogleShowBanner(false)}
                  >
                    <span className="sr-only">Dismiss</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
