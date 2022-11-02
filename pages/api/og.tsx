import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "Title";
  const description = searchParams.get("description") || "";
  const publishedDate =
    searchParams.get("publishedDate") || new Date().toLocaleDateString();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "10px",
          position: "relative",
        }}
      >
        <div tw="relative flex w-full h-full flex-col border border-gray-100 rounded-lg">
          <div tw="flex flex-col p-8 h-full w-full">
            <div tw="justify-between flex">
              <div tw="flex flex-col justify-between">
                <h3 tw="mt-1 text-xl font-bold text-gray-900">{title}</h3>

                <p tw="mt-0 text-xs font-medium text-gray-600">By Thanh Le</p>
              </div>

              <div tw="flex-shrink-0 hidden ml-3 sm:block">
                {/* <img
                alt="Paul Clapton"
                style={{ width: 64, height: 64 }}
                src="TODO"
                tw="object-cover w-16 h-16 rounded-lg shadow-sm"
              /> */}
              </div>
            </div>

            <div tw="flex mt-2 sm:pr-8">
              <p tw="text-sm text-gray-500">{description}</p>
            </div>

            <div tw="flex mt-3">
              <div tw="flex flex-col">
                <dt tw="text-xs text-gray-500">Published</dt>
                <dd tw="text-sm font-medium text-gray-600 ">{publishedDate}</dd>
              </div>

              <div tw="flex flex-col ml-12">
                <div tw="text-xs text-gray-500">Reading time</div>
                <dd tw="text-sm font-medium text-gray-600">5 minutes</dd>
              </div>
            </div>
          </div>
          <div
            tw="absolute bottom-0 w-full h-3 rounded-b-lg"
            style={{
              width: "100%",
              backgroundImage:
                "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            }}
          ></div>
        </div>
      </div>
    ),
    {
      width: 1200 / 2,
      height: 630 / 2,
    }
  );
}
