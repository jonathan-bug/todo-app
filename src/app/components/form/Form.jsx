"use client";

import styles from "@/app/components/form/component.module.css";
import Check from "@/app/components/check/Check";
import { useState, useRef } from "react";
import axios from "axios";

export default function Form({jobs, setJobs, values, setValues, check, setCheck}) {
    const priorityRef = useRef(null);
    const [repaint, setRepaint] = useState(false);
    const priorityOptions = [
        "A",
        "B",
        "C",
        "D"
    ];
    
    return (
        <div className={styles.form}>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Task</label>
                <input className={styles.form__input} name="" type="text" placeholder="Enter your task"
                       onChange={e => setValues({...values, title: e.target.value})}
                       value={values.title}
                />
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Priority</label>
                <select className={styles.form__input} id="" name="" ref={priorityRef}>
                    {priorityOptions.map(priorityOption =>
                        <option key={priorityOption} value={priorityOption}>{priorityOption}</option>
                    )}
                </select>
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Until</label>
                <input className={styles.form__input} name="" type="date" placeholder="Enter your task"
                       onChange={e => setValues({...values, until: e.target.value})}
                       value={values.until}
                />
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Repeat</label>
                <Check values={values} changeValues={setValues} value={values.repeat} check={check} setCheck={setCheck} repaint={repaint}/>
            </div>
            <div className={styles.form__group}>
                <div className={styles.form__group_button}>
                    <button className={styles.form__button}
                            onClick={async () => {
                                const value = {
                                    ...values,
                                    priority: priorityRef.current.value
                                }

                                console.log(value)

                                if(!value.id) {
                                    const res = await axios.post("/api/tasks", value);

                                    if(!res.data.err) {
                                        setJobs([...jobs, {
                                            ...value,
                                            id: res.data.id
                                        }]);
                                        setValues({
                                            title: "",
                                            priority: "",
                                            until: "",
                                            repeat: false
                                        });

                                        priorityRef.current.priority = "A";
                                    }
                                }else {
                                    const res = await axios.put("/api/tasks", value);

                                    if(!res.data.err) {
                                        setJobs(jobs.map(job => {
                                            if(job.id == value.id) {
                                                return value;
                                            }else {
                                                return job;
                                            }
                                        }));

                                        setCheck(false);
                                        setRepaint(!repaint);
                                        setValues({
                                            id: null,
                                            title: "",
                                            priority: "",
                                            until: "",
                                            repeat: false
                                        });

                                        priorityRef.current.priority = "A";
                                    }
                                }
                            }}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}
