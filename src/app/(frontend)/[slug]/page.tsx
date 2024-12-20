import type { Metadata } from 'next';

import { PayloadRedirects } from '@/components/PayloadRedirects';
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { draftMode } from 'next/headers';
import React, { cache } from 'react';

import type { Page as PageType } from '../../../payload-types';

import { Blocks } from '../../components/Blocks';
import { Hero } from '../../components/Hero';
import { generateMeta } from '../../utilities/generateMeta';

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  });

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home';
    })
    .map(({ slug }) => slug);
}

export default async function Page({ params }) {
  const { slug = 'home' } = await params;
  const url = '/' + slug;

  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
  });

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <Hero {...hero} />
      <Blocks blocks={layout} />
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  // Await the params to resolve the promise
  const { slug = 'home' } = await paramsPromise;

  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayloadHMR({ config: configPromise });

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
  });

  return result.docs?.[0] || null;
});
