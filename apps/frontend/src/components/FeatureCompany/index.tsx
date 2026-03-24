import { Button } from "antd";
import { useStyles } from "./style";
import Grid from "../Grid";
import CompanyCard from "../CompanyCard";
import type { FeatureCompany } from "@/services/homepageService";
interface FeatureCompanyProps {
    companies: FeatureCompany[];
}
const FeatureCompany = ({companies}: FeatureCompanyProps ) => {
    const { styles } = useStyles();
    return (
        <div className={styles.jobWrapper}>
            <div className={styles.header}>
                <div className={styles.heading}>
                    <h1 className={styles.headingTitle}>Top Companies</h1>
                    <p className={styles.description}>
                        Top Companies are now recruiting Recruitify..
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
                maxItemWidth={280}
            >
                {companies.map((company) => (
                    <CompanyCard key={company.id} {...company} />
                ))}
            </Grid>
        </div>
    );
}

export default FeatureCompany;