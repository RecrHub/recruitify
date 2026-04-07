'use client';

import { type ElementType, type Ref, createElement, memo, use } from 'react';

import { ConfigContext } from '@/components/ConfigProvider';
import type { AProps } from '@/types';

const A = memo<AProps & { ref?: Ref<HTMLAnchorElement> }>((props) => {
  const config = use(ConfigContext);
  const render = config?.aAs || 'a';

  return createElement(render, props);
});

A.displayName = 'A';

export default A;
