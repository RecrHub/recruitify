"use client";

import { Flexbox } from "react-layout-kit";
import { Input, Button, Card, Select } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import UserIcon from "@/access/icons/users-duotone 1.svg";
import JobIcon from "@/access/icons/briefcase-duotone1.svg";
import BuildingTown from "@/access/icons/buildings-duotone1.svg";
import { useStyles } from "./style";
import HeroImg from "@/access/icons/HeroSection.svg"
import GruopImageFirt from "@/access/icons/GruopImageFirts.svg"
import GruopImageSecond from "@/access/icons/GroupSecond.svg"
export default function HeroContainer() {
  const { styles } = useStyles();

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.imgHero}>
        <HeroImg />
      </div>
      <div className={styles.gruopImage}>
        <div className={styles.gruopImageFirt}>
          <GruopImageFirt />
        </div>
        <div className={styles.gruopImageSecond}>
          <GruopImageSecond />
        </div>
      </div>
      <Flexbox className={styles.container}>
        <h1>
          Discover the Best Jobs <br /> to Build Your Career
        </h1>
        <p>
          Find a job you enjoy doing, and you will never have to work a day{" "}
          <br />
          in your life..
        </p>

        {/* Search Box */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <div className={styles.inputWrapper}>
              <SearchOutlined style={{ fontSize: 24, color: "#9ca3af" }} />
              <Input
                placeholder="Job tittle, Keyword..."
                className={styles.input}
                variant="borderless"
              />
            </div>

            <div className={styles.divider} />

            <div className={styles.inputWrapper}>
              <EnvironmentOutlined style={{ fontSize: 24, color: "#9ca3af" }} />
              <Select
                placeholder="Your Location"
                className={styles.selectCustom}
                variant="borderless"
                showSearch
                allowClear
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <Button type="primary" className={styles.button}>
            Find Job
          </Button>
        </div>

        {/* Suggestions */}
        <div className={styles.suggestions}>
          <span className="label">| Suggestion:</span>
          <span className="keyword">Designer</span>
          <span className="normal">,</span>
          <span className="keyword">Developer</span>
          <span className="normal">,</span>
          <span className="keyword">Manager</span>
          <span className="normal">,</span>
          <span className="keyword">Finance</span>
          <span className="normal">,</span>
          <span className="keyword">Marketing</span>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={`${styles.iconBox} default`}>
              <JobIcon />
            </div>
            <div className={styles.statContent}>
              <p className="number">1,75,324</p>
              <p className="label">Live Job</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={`${styles.iconBox} green`}>
              <BuildingTown />
            </div>
            <div className={styles.statContent}>
              <p className="number">97,354</p>
              <p className="label">Companies</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={`${styles.iconBox} default`}>
              <UserIcon />
            </div>
            <div className={styles.statContent}>
              <p className="number">38,47,154</p>
              <p className="label">Candidates</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={`${styles.iconBox} default`}>
              <JobIcon />
            </div>
            <div className={styles.statContent}>
              <p className="number">7,532</p>
              <p className="label">New Jobs</p>
            </div>
          </Card>
        </div>
      </Flexbox>
    </div>
  );
}
