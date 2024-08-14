"use client";

import styles from "@/app/login/page.module.css";
import styles2 from "@/app/components/form/component.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    
    if(localStorage.getItem("token") != null) {
        router.push("/");
    }
    
    return (
        <div className={styles.container}>
            <div className={`${styles2.form} ${styles.form_}`}>
                <div className={styles2.form__group}>
                    <label className={styles2.form__label}>User</label>
                    <input className={styles2.form__input} name="" type="text"
                           onChange={event => {
                               setUser({...user, username: event.target.value});
                           }}
                           value={user.username}
                    />
                </div>
                <div className={styles2.form__group}>
                    <label className={styles2.form__label}>Password</label>
                    <input className={styles2.form__input} name="" type="password"
                           onChange={event => {
                               setUser({...user, password: event.target.value});
                           }}
                           value={user.password}
                    />
                </div>
                
                <div className={styles2.form__group}>
                    <div className={styles2.form__group_button}>
                        <button className={styles2.form__button} onClick={async () => {
                            const res = await axios.post("/api/login", user);

                            const authUser = res.data;
                            
                            if(authUser.token != null) {
                                localStorage.setItem("token", authUser.token);
                                router.push("/");
                            }
                        }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
