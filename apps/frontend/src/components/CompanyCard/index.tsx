import { useStyles } from "./style";
import { CompanyCardProps } from "./tyles";
import { ArrowUpRight } from "lucide-react";
const CompanyCard = ({ companyTitle, companyOver, companyImg, }: CompanyCardProps) => {
    const { styles } = useStyles();
    return (
        <div className={styles.jobWrapper}>
            <div className={`${styles.bookmarkIcon} bookmark-icon`}>
                <ArrowUpRight />
            </div>
            <div className={styles.header}>
                <div className={styles.companyIcon}>
                    <img src={companyImg} alt={companyImg} onError={(e) => {
                        e.currentTarget.src = ''
                    }}></img>
                </div>
                <h2 className={styles.header}>{companyTitle}</h2>
                <div className={styles.overview}>
                    {companyOver}
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;