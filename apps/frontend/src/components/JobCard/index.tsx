import { Button } from "antd";
import BookMarkIcon from "@/access/icons/BookmarkSimple.svg";
import BriefCase from "@/access/icons/Briefcase.svg"
import Location from "@/access/icons/fi_map-pin.svg"
import { useStyles } from './style';
import { JobCardProps } from "./type";
const JobCard = ({ title, companyName, salaryRange, location, employmentType, createdAt, companyLogo = "" }: JobCardProps) => {
    const { styles } = useStyles();
    return (
        <div className={styles.jobCard}>
            <div className={styles.bookmarkIcon}>
                <BookMarkIcon />
            </div>

            <div className={styles.header}>
                <div className={styles.companyIcon}>
                    <img src={companyLogo} alt={companyName}></img>
                    <span>{companyLogo}</span>
                </div>
                <div className={styles.headerContent}>
                    <h3 className={styles.jobTitle}>{title}</h3>
                    <p className={styles.companyName}>{companyName}</p>
                </div>
            </div>

            <h2 className={styles.salary}>{salaryRange}</h2>

            <div className={styles.infoList}>
                <div className={styles.infoRow}>
                    <Location></Location>
                    <span>{location}</span>
                </div>
                <div className={styles.infoRow}>
                    <BriefCase />
                    <span>{employmentType}</span>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.postedDate}>Posted {createdAt}</span>
                <Button className={styles.viewButton}>Apply Job</Button>
            </div>
        </div>
    );
};

export default JobCard;