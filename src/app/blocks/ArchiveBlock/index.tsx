import React from 'react';
import RichText from 'src/app/components/RichText';

import type { ArchiveBlockProps } from './types';

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async (props) => {
  const { id, introContent } = props;

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
    </div>
  );
};
