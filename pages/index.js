import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

import Image from 'next/image'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0">
                    <dl>
                      <dt className="sr-only"></dt>
                      <dd className="mb-4 flex flex-row items-center gap-x-3">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="flex flex-col items-center sm:flex-row xl:col-span-3">
                      <div className="mx-2 my-8 w-full sm:my-0 sm:w-1/3">
                        <Link href={`/blog/${slug}`}>
                          <div className="overflow-hidden rounded-xl sm:px-0">
                            <Image
                              alt="illustration"
                              className="rounded object-cover"
                              src={frontMatter.images[0]}
                              layout="responsive"
                              width={640}
                              height={400}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="mx-2 w-full sm:w-2/3">
                        <div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              <Link
                                href={`/blog/${slug}`}
                                data-cy="post-title"
                                className="border-b-2 border-transparent duration-300 hover:border-brand dark:text-gray-50"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                            {summary}
                          </div>
                          <Link
                            href={`/blog/${slug}`}
                            aria-label={`Read "${title}"`}
                            className="border-b-2 border-transparent duration-300 hover:border-brand"
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
