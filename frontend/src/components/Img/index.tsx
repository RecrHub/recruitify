'use client';

import type { ImageProps } from 'antd';
import { Ref, createElement, memo, use } from 'react';

import { ConfigContext } from '@/components/ConfigProvider';
import type { ImgProps as HtmlImgeProps } from '@/types';

type ImgProps = HtmlImgeProps & ImageProps & { ref?: Ref<HTMLImageElement>; unoptimized?: boolean };

const Img = memo<ImgProps>(({ unoptimized, ...rest }) => {
  const config = use(ConfigContext);
  const render = config?.imgAs || 'img';

  return createElement(render, {
    unoptimized: unoptimized === undefined ? config?.imgUnoptimized : unoptimized,
    ...rest,
  });
});

Img.displayName = 'Img';

export default Img;
