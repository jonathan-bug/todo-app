"use client";

import styles from "@/app/page.module.css";
import Form from "./components/form/Form";
import Card from "@/app/components/card/Card";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// auth the token
export async function auth(router) {
    const token = localStorage.getItem("token");
    const res = await axios.post("/api/auth", {}, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    const token_ = await res.data.token
    if(token_ == null) {
        router.push("/login")
    }else {
        localStorage.setItem("token", token_)
    }
}

export default function Page() {
    const router = useRouter()
    auth(router)
    
    const toggleLeft = useRef(false);
    const [check, setCheck] = useState(false);
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
            try {
                const token = localStorage.getItem("token");

                if(token != null) {
                    const res = await axios.get("/api/tasks", {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });

                    setJobs(await res.data);
                }
            }catch {
                
            }
        })();
    }, []);
    
    return (
        <div className={styles.layout}>
            <div className={layoutLeftStyle}>
                <Form jobs={jobs} setJobs={setJobs} values={job} setValues={setJob} check={check} setCheck={setCheck}/>
            </div>
            <div className={styles.layout__right}>
                <div className="grid-container">
                    <div className="grid-x">
                        <div className="grid-y">
                            <div className={styles.button_container}>
                                <button className={`${styles.icon_button} ${styles.icon_button__title}`}
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            router.push("/login");
                                        }}
                                >
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
                                setCheck={setCheck}
                                setJob={setJob}
                                values={jobs}
                                setValues={setJobs}
                                id={job.id}
                                title={job.title}
                                priority={job.priority}
                                until={job.until}
                                repeat={(job.repeat)? "Yes": "No"}
                            />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
