import { Button } from "antd";
import { createStyles } from "antd-style";
import LogoRecrutify from "@/access/icons/LogoRecuitify.svg"
import { useStyles } from "./style";
const PricingSection = () => {
    const { styles } = useStyles();
    return (
        <div className={styles.pricingWrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <div className={styles.headingContent}>
                            Ready to Find Your Next Job Role  ?
                        </div>
                        <div className={styles.description}>
                            <div className={styles.descriptionJoin}>Join Thousands of professionals who have found their dream job With Recruitify</div>
                            <div className={styles.descriptionGet}>Get Started Today</div>
                        </div>
                        <Button className={styles.ButtonSecondary}>Brower all Jobs</Button>
                    </div>
                    <div className={styles.LogoWrap}>
                        <LogoRecrutify />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingSection;