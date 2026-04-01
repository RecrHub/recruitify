"use client";

import { useState } from "react";
import { Input, Button, Card, Select } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import UserIcon from "@/access/icons/users-duotone 1.svg";
import JobIcon from "@/access/icons/briefcase-duotone1.svg";
import BuildingTown from "@/access/icons/buildings-duotone1.svg";
import styles from "./HeroSection.module.css";
import HeroImg from "@/access/icons/HeroSection.svg";
import GruopImageFirt from "@/access/icons/GruopImageFirts.svg";
import GruopImageSecond from "@/access/icons/GroupSecond.svg";
import { useRouter } from "next/navigation";

export default function HeroContainer() {
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <div className={styles.heroWrapper}>
      <div
        className={`${styles.overlay} ${searchFocused ? styles.overlayVisible : ""}`}
        onClick={() => setSearchFocused(false)}
      />
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
      <div className={styles.container}>
        <h1>
          Discover the Best Jobs <br /> to Build Your Career
        </h1>
        <p>
          Find a job you enjoy doing, and you will never have to work a day{" "}
          <br />
          in your life..
        </p>

        {/* Search Box */}
        <div
          className={`${styles.searchWrapper} ${searchFocused ? styles.searchWrapperFocused : ""}`}
        >
          <div className={styles.searchBox}>
            <div className={styles.inputWrapper}>
              <SearchOutlined style={{ fontSize: 24, color: "#9ca3af" }} />
              <Input
                placeholder="Job tittle, Keyword..."
                className={styles.input}
                variant="borderless"
                onFocus={() => setSearchFocused(true)}
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
                onFocus={() => setSearchFocused(true)}
              />
            </div>
          </div>

          <Button
            type="primary"
            className={styles.button}
            onClick={() => router.push("/findjob")}
          >
            Find Job
          </Button>
        </div>

        {/* Suggestions */}
        <div className={styles.suggestions}>
          <span className={styles.suggestionLabel}>| Suggestion:</span>
          <span className={styles.suggestionKeyword}>Designer</span>
          <span className={styles.suggestionNormal}>,</span>
          <span className={styles.suggestionKeyword}>Developer</span>
          <span className={styles.suggestionNormal}>,</span>
          <span className={styles.suggestionKeyword}>Manager</span>
          <span className={styles.suggestionNormal}>,</span>
          <span className={styles.suggestionKeyword}>Finance</span>
          <span className={styles.suggestionNormal}>,</span>
          <span className={styles.suggestionKeyword}>Marketing</span>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.iconBox}>
              <JobIcon />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statNumber}>1,75,324</p>
              <p className={styles.statLabel}>Live Job</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.iconBoxGreen}>
              <BuildingTown />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statNumber}>97,354</p>
              <p className={styles.statLabel}>Companies</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.iconBox}>
              <UserIcon />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statNumber}>38,47,154</p>
              <p className={styles.statLabel}>Candidates</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.iconBox}>
              <JobIcon />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statNumber}>7,532</p>
              <p className={styles.statLabel}>New Jobs</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
    );
}
