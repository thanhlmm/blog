import React from "react";
import { NextPageContext } from "next";
import { getAllPosts, Post } from ".";
import dayjs from 'dayjs';

const blogPostsRssXml = (blogPosts: Post[]) => {
  const latestPostDate = new Date();
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>
          https://thanhle.blog/blog/${post.slug}
        </link>
        
        <pubDate>${dayjs(post.date, "YYYY-MM-DD").toDate()}</pubDate>
        <description>
        <![CDATA[${post.description}]]>
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts: Post[]) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Blog by Thanh Le</title>
        <link>https://thanhle.blog</link>
        <description>I write about Product and Sofware Development</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export default class Rss extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return;
    }
    const blogPosts = await getAllPosts();
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(blogPosts));
    res.end();
  }
}
