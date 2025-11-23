import { Button } from "antd";
import BookMarkIcon from "@/access/icons/BookmarkSimple.svg";
import BriefCase from "@/access/icons/Briefcase.svg"
import Location from "@/access/icons/fi_map-pin.svg"
import { useStyles } from './style';
import { JobCardProps } from "./type";
const JobCard = ({ title, company, salary, location, workTime, postedDate, icon = "📱" }: JobCardProps) => {
    const { styles } = useStyles();

    return (
        <div className={styles.jobCard}>
            <div className={styles.bookmarkIcon}>
                <BookMarkIcon />
            </div>

            <div className={styles.header}>
                <div className={styles.companyIcon}>
                    <span>{icon}</span>
                </div>
                <div className={styles.headerContent}>
                    <h3 className={styles.jobTitle}>{title}</h3>
                    <p className={styles.companyName}>{company}</p>
                </div>
            </div>

            <h2 className={styles.salary}>{salary}</h2>

            <div className={styles.infoList}>
                <div className={styles.infoRow}>
                    <Location></Location>
                    <span>{location}</span>
                </div>
                <div className={styles.infoRow}>
                    <BriefCase />
                    <span>{workTime}</span>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.postedDate}>Posted {postedDate}</span>
                <Button className={styles.viewButton}>Apply Job</Button>
            </div>
        </div>
    );
};

export default JobCard;