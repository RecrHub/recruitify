import { createStyles } from "antd-style";
import { useState } from "react";

const useStyles = createStyles(({ css, responsive }) => ({
  exploreWrapper: css`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-block: 96x;
    padding-inline: 24px;

    ${responsive.tablet} {
      padding-block: 120px;
      max-width: 960px;
    }

    ${responsive.mobile} {
      padding-block: 80px;
      padding-inline: 16px;
    }
  `,

  container: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: auto;
    max-width: 1168px;
    padding: 96px 24px 120px 24px;
    margin: 0 auto;
  `,

  header: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 64px;
  `,

  headingContent: css`
    color: #231f20;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    line-height: 44px;
    margin-bottom: 16px;
  `,

  description: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    max-width: 520px;
  `,

  descriptionJoin: css`
    color: #4f4945;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,

  descriptionGet: css`
    color: #4f4945;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,

  faqGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 1200px;

    ${responsive.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }

    ${responsive.mobile} {
      grid-template-columns: 1fr;
    }
  `,

  faqCard: css`
    background: #ffffff;
    padding: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
  `,

  faqQuestion: css`
    color: #231f20;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 12px;
  `,

  faqAnswer: css`
    color: #6b6b6b;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  `,
}));

export default function ExploreFAQ() {
  const { styles } = useStyles();

  const faqs = [
    {
      question: "How do I create an account on Recruitify?",
      answer: "Creating an account is simple. Just click on the \"Sign Up\" button at the top of the page, enter your details, and follow the prompts to set up your profile."
    },
    {
      question: "What integrations does Recruitify support?",
      answer: "Recruitify supports a wide range of integrations, including popular tools like Figma, Github, and more. Check our documentation for the full list."
    },
    {
      question: "Is Recruitify suitable for small businesses?",
      answer: "Absolutely! Scalable features cater to small businesses, ensuring adaptability and efficiency in various operations."
    },
    {
      question: "Customize Recruitify for team workflows?",
      answer: "Yes, Recruitify offers customization for your team's specific needs. The user-friendly interface makes the process seamless."
    },
    {
      question: "How secure is Recruitify for sensitive data?",
      answer: "Security is our priority. Flexify is ISO 27001 certified, ensuring robust measures to protect your data. Learn more about our security practices in our docs."
    },
    {
      question: "Recruitify onboarding process?",
      answer: "Quick, intuitive sign-up. Follow guided steps for a seamless, efficient, and user-friendly onboarding experience."
    }
  ];

  return (
    <div className={styles.exploreWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingContent}>Explore Our FAQs</div>

          <div className={styles.description}>
            <div className={styles.descriptionJoin}>
              Find quick answers to commonly asked questions about Recruitify.
            </div>
            <div className={styles.descriptionGet}>
              Have a question not listed?
            </div>
          </div>
        </div>

        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqCard}>
              <div className={styles.faqQuestion}>{faq.question}</div>
              <div className={styles.faqAnswer}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}