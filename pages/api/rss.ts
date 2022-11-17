import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dayjs from 'dayjs';
import { getAllPosts } from '..'

const metadata = {
  title: 'Thanh Le Blog',
  description: 'I share about Frontend, Engineer and some thought in Product and Life 😴',
  link: 'https://thanhle.blog',
}

const handler = nc<NextApiRequest, NextApiResponse>();

const toAbsoluteUrl = (slug: string) => `https://thanhle.blog/blog/${slug}`;

/**
 * Respond with an rss.xml
 *
 * @param {object} req NextApiRequest
 * @param {object} res NextApiResponse
 */
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getAllPosts({ locale: 'vi', includeDraft: false });

  try {
    const postItems = posts
      .map((page) => {
        const url = toAbsoluteUrl(page.slug)
        const pubDate = dayjs(page.date, "YYYY-MM-DD").toDate();
        // <content:encoded>${page.content}</content:encoded>
        return `<item>
          <title><![CDATA[${page.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate.toUTCString()}</pubDate>
          ${page.description &&
          `<description><![CDATA[${page.description}]]></description>`
          }
        </item>`
      })
      .join('\n\n')

    const mostRecentlyPostDate = posts
      .sort(
        (a, b) =>
          dayjs(b.date, "YYYY-MM-DD").unix() -
          dayjs(a.date, "YYYY-MM-DD").unix()
      )
      .pop();
    // Add urlSet to entire sitemap string

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <atom:link href="${process.env.NEXT_PUBLIC_ROOT_URL
      }/feed.xml" rel="self" type="application/rss+xml" />
      <title>${metadata.title}</title>
      <description>${metadata.description}</description>
      <link>${metadata.link}</link>
      <lastBuildDate>${dayjs(
        mostRecentlyPostDate?.date
      ).toDate().toUTCString()}</lastBuildDate>
      ${postItems}
    </channel>
    </rss>`

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml; charset=utf-8')

    return res.status(200).send(sitemap)
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e
    }

    return res.status(500).json({ error: e.message || '' })
  }
})

export default handler