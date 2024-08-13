"use client";

import styles from "@/app/login/page.module.css";
import styles2 from "@/app/components/form/component.module.css";
import axios from "axios";

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={`${styles2.form} ${styles.form_}`}>
                <div className={styles2.form__group}>
                    <label className={styles2.form__label}>User</label>
                    <input className={styles2.form__input} name="" type="text" />
                </div>
                <div className={styles2.form__group}>
                    <label className={styles2.form__label}>Password</label>
                    <input className={styles2.form__input} name="" type="text" />
                </div>
                
                <div className={styles2.form__group}>
                    <div className={styles2.form__group_button}>
                        <button className={styles2.form__button} onClick={async () => {
                            const res = await axios.post("/api/login", {
                                username: "jj"
                            })

                            const user = res.data
                            
                            if(user.token != null) {
                                localStorage.setItem("token", user.token)
                            }
                        }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
