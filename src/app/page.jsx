"use client";

import styles from "@/app/page.module.css";
import Form from "./components/form/Form";
import Card from "@/app/components/card/Card";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
    const toggleLeft = useRef(false);
    const [layoutLeftStyle, setLayoutLeftStyle] = useState(`${styles.layout__left}`);
    const [cardStyle, setCardStyle] = useState("grid-y grid-y-sm-6 grid-y-md-4 grid-y-xl-3");
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({
        title: "",
        priority: "",
        until: "",
        repeat: false
    });

    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/tasks");

            setJobs(await res.data);
        })();
    }, []);

    return (
        <div className={styles.layout}>
            <div className={layoutLeftStyle}>
                <Form jobs={jobs} setJobs={setJobs} values={job} setValues={setJob}/>
            </div>
            <div className={styles.layout__right}>
                <div className="grid-container">
                    <div className="grid-x">
                        <div className="grid-y">
                            <div className={styles.button_container}>
                                <button className={`${styles.icon_button} ${styles.icon_button__title}`}>
                                    Logout
                                </button>
                                <button className={styles.icon_button} onClick={() => {
                                    if(toggleLeft.current) {
                                        setLayoutLeftStyle(`${styles.layout__left}`);
                                        setCardStyle("grid-y grid-y-xm-12 grid-y-sm-12 grid-y-md-6 grid-y-lg-4 grid-y-xl-3");
                                    }else {
                                        setLayoutLeftStyle(`${styles.layout__left} ${styles.layout__left__show}`);
                                        setCardStyle("grid-y grid-y-xm-12 grid-y-sm-12 grid-y-md-12 grid-y-lg-6 grid-y-xl-4");
                                    }
                                    
                                    toggleLeft.current = !toggleLeft.current;
                                }}>
                                    <img alt="" src="/bx-menu.svg"/>
                                </button>
                            </div>
                        </div>

                        { jobs.map(job => <div key={job.id} className={cardStyle}>
                            <Card
                                values={jobs}
                                setValues={setJobs}
                                id={job.id}
                                title={job.title}
                                priority={job.priority}
                                until={(new Date(job.until).toLocaleDateString())}
                                repeat={(job.repeat)? "Yes": "No"}
                            />
                        </div>)}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
