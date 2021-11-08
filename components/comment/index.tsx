import withHydrationOnDemand from "react-hydration-on-demand";

const Comment = () => {
  return (
    <div>
      <p className="text-center">
        <span>🗣</span> You need to sign in to view others comments
      </p>
      <div
        className="h-40"
        dangerouslySetInnerHTML={{
          __html: `
        <script
          src="https://utteranc.es/client.js"
          repo="thanhlmm/blog"
          issue-term="pathname"
          label="comment"
          theme="github-light"
          crossOrigin="anonymous"
          async
        ></script>
      `,
        }}
      ></div>
    </div>
  );
};

export default withHydrationOnDemand({ on: [] })(Comment);
