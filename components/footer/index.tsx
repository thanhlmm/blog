// import { XIcon } from "@heroicons/react/outline";
// import { useState } from "react";

const Footer = () => {
  // const [showBanner, toogleShowBanner] = useState(true);

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
      {/* {showBanner && (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="p-1 bg-yellow-500 rounded-lg shadow-lg sm:p-2">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-1 w-0">
                  <span className="flex p-1 text-2xl bg-yellow-500 rounded-lg">
                    🥶
                  </span>
                  <p className="ml-3 font-medium text-white">
                    <span>
                      Mình đang chạy thử quảng cáo Google Adsense, nếu có bất
                      tiện thì cho mình xin lỗi nhé, sẽ gỡ sau 1 tháng chạy thử
                    </span>
                  </p>
                </div>
                <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className="flex p-2 -mr-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-white"
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
      )} */}
    </>
  );
};

export default Footer;
