import { useStyles } from "./style";
import { CompanyCardProps } from "./tyles";
import { ArrowUpRight } from "lucide-react";
const CompanyCard = ({ title, overview, imageUrl, }: CompanyCardProps) => {
    const { styles } = useStyles();
    return (
        <div className={styles.jobWrapper}>
            <div className={`${styles.bookmarkIcon} bookmark-icon`}>
                <ArrowUpRight />
            </div>
            <div className={styles.header}>
                <div className={styles.companyIcon}>
                </div>
                <h2 className={styles.header}>{title}</h2>
                <div className={styles.overview}>
                    {overview}
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;