import React, { forwardRef } from "react";
import { useStyles } from "./logo.styles";

export type LogoProps = {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  /**
   * If true (default) svg is placed before the text. If false, text is on the left.
   */
  svgFirst?: boolean;
};

const Logo = forwardRef<HTMLSpanElement, LogoProps>(
  ({ className, style, text = "Recruitify", svgFirst = true }, ref) => {
    const { styles, cx } = useStyles();

    const svg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        aria-hidden
      >
        <path d="M12.042 10V23H0.5V10H12.042Z" fill="black" stroke="black" />
        <path
          d="M29.7648 16.2664L29.5861 16.1169L21.2247 9.11694L21.0851 8.99976H13.0421V0.666748H24.8829L39.2169 14.3796V22.9998H29.7648V16.2664Z"
          fill="black"
          stroke="black"
        />
      </svg>
    );

    return (
      <span ref={ref} className={cx(styles.logo, className)} style={style}>
        {svgFirst ? (
          <>
            {svg}
            <span className={styles.logoText}>{text}</span>
          </>
        ) : (
          <>
            <span className={styles.logoText}>{text}</span>
            {svg}
          </>
        )}
      </span>
    );
  }
);
Logo.displayName = "Logo";

export default Logo;
