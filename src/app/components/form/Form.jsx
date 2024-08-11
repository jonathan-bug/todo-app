"use client";

import styles from "@/app/components/form/component.module.css";
import Check from "@/app/components/check/Check";

export default function Form() {
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
                <input className={styles.form__input} name="" type="text" placeholder="Enter your task"/>
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Priority</label>
                <select className={styles.form__input} id="" name="">
                    {priorityOptions.map(priorityOption =>
                        <option key={priorityOption} value={priorityOption}>{priorityOption}</option>
                    )}
                </select>
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Until</label>
                <input className={styles.form__input} name="" type="date" placeholder="Enter your task"/>
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Repeat</label>
                <Check/>
            </div>
            <div className={styles.form__group}>
                <div className={styles.form__group_button}>
                    <button className={`${styles.form__button} ${styles.form__button_solid}`}>Close</button>
                    <button className={styles.form__button}>Save</button>
                </div>
            </div>
        </div>
    )
}
