"use client";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/app/login/page.module.css";
import styles2 from "@/app/components/form/component.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// login page
export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const res = await axios.post("/api/auth", {}, {
                headers: {
                    Authorization: "Bearer: " + token
               } 
            });

            const newToken = await res.data.token;

            if(newToken != null) {
                router.push("/");
            }
        })();
    }, []);
    return (
        <div className={styles.container}>
            <form>
                <div className={`${styles2.form} ${styles.form_}`}>
                    <div className={styles2.form__group}>
                        <h1 className={styles2.form__title}>
                            Login
                        </h1>
                    </div>
                    <div className={styles2.form__group}>
                        <label className={styles2.form__label}>Username</label>
                        <input className={styles2.form__input} name="" type="text"
                               onChange={event => {
                                   setUser({...user, username: event.target.value});
                               }}
                               value={user.username}
                               autoComplete="username"
                               placeholder="Enter your username"
                        />
                    </div>
                    <div className={styles2.form__group}>
                        <label className={styles2.form__label}>Password</label>
                        <input className={styles2.form__input} type="password"
                               onChange={event => {
                                   setUser({...user, password: event.target.value});
                               }}
                               value={user.password}
                               autoComplete="new-password"
                               name="password"
                               placeholder="Enter your password"
                        />
                    </div>
                    
                    <div className={styles2.form__group}>
                        <div className={styles2.form__group_button}>
                            <button className={styles2.form__button} onClick={async event => {
                                event.preventDefault()
                                const res = await axios.post("/api/login", user);

                                const authUser = res.data;
                                
                                if(authUser.token != null) {
                                    localStorage.setItem("token", authUser.token);
                                    router.push("/");
                                }else {
                                    toast.error("Username or password incorrent", {
                                        position: "bottom-right"
                                    });
                                }
                            }}>Login</button>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
