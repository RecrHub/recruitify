import { Button, Space } from "antd";
import Grid from "../Grid";
import { jobsData } from "../JobCard/mockdata";
import JobCard from "../JobCard";
import { useStyles } from './style';

const FeatureJob = () => {
    const { styles } = useStyles();
    return (
        <div className={styles.jobWrapper}>
            <div className={styles.header}>
                <div className={styles.heading}>
                    <h1 className={styles.headingTitle}>Feature Jobs</h1>
                    <p className={styles.description}>
                        Exclusively available with our partners at RecruitJob.
                    </p>
                </div>
                <Button className={styles.viewAllButton}>
                    View All →
                </Button>
            </div>

            <Grid
                width="100%"
                gap={27}
                rows={3}
                maxItemWidth={200}
            >
                {jobsData.map((job) => (
                    <JobCard key={job.id} {...job} />
                ))}
            </Grid>
        </div>
    );
};

export default FeatureJob;