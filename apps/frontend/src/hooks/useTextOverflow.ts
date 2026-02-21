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
      setIsOverflow(false);
      return;
    }

    const check = () => {
      setIsOverflow(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight);
    };

    check();

    const observer = new ResizeObserver(check);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, ellipsis, children]);

  return isOverflow;
};
