import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return rss({
    title: 'Midsphere Blog',
    description:
      'Insights on AI agents, automation, and building with Midsphere. Tips, benchmarks, and guides for getting the most out of autonomous AI.',
    site: context.site!.href,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        author: post.data.author,
        link: `/blog/${post.id}/`,
      })),
    customData: '<language>en-us</language>',
  });
}
