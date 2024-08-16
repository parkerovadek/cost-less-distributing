import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from 'src/payload/seed/home-static'

import type { Page as PageType } from '../../../payload-types'

import { Blocks } from '../../components/Blocks'
import { Hero } from '../../components/Hero'
import { generateMeta } from '../../utilities/generateMeta'

import { shopifyClient } from '@/utilities/shopify'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => slug)
}

export default async function Page({ params: { slug = 'home' } }) {
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  const request = await shopifyClient.fetch(`#graphql
    query Collections {
      collections(first: 250) {
        nodes {
          title
          metafield(namespace: "custom", key: "is_company") {
            namespace
            key
            value
          }
        }
      }
    }
  `)

  const { data: { collections } } = await request.json()
  const companies = collections.nodes.filter((node) => node.metafield?.value === 'true');

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <code>
        {JSON.stringify(companies, null, 2)}
      </code>

      <Hero {...hero} />
      <Blocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
