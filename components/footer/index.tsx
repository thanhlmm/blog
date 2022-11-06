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
            href="https://twitter.com/cuthanh15"
            className="text-blue-600"
            target="_blank"
          >
            @cuthanh15
          </a>
        </p>
      </div>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="p-1 bg-green-500 rounded-lg shadow-lg sm:p-2">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-1 w-0">
                  <span className="flex p-1 text-2xl bg-green-500 rounded-lg">
                    🥳
                  </span>
                  <p className="ml-3 font-medium text-white">
                    <span>
                      Mình có{" "}
                      <a
                        className="underline underline-offset-2 "
                        href="https://discord.com/events/462663954813157376/1038479856998031521"
                      >
                        buổi chia sẻ về Career và Mindset và một chút về
                        Blockchain
                      </a>{" "}
                      khi đi làm vào thứ 2, mọi người vào nghe thử xem thằng
                      Thành này nghĩ gì nhé!
                    </span>
                  </p>
                </div>
                <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className="flex p-2 -mr-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
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
