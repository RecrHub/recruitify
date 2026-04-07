import { type RefObject, useEffect, useState } from 'react';

import type { TextProps } from '@/components/Text/type';

export const useTextOverflow = (
  ref: RefObject<HTMLElement | null>,
  ellipsis: TextProps['ellipsis'],
  children: React.ReactNode,
): boolean => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !ellipsis) {
      return;
    }

    const check = () => {
      setIsOverflow(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight);
    };

    const observer = new ResizeObserver(check);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, ellipsis, children]);

  const effectiveOverflow = ellipsis ? isOverflow : false;

  return effectiveOverflow;
};
