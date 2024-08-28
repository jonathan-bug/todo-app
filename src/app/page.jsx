"use client";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/app/page.module.css";
import Form from "./components/form/Form";
import Card from "@/app/components/card/Card";
import { useRef, useState, useEffect, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// auth the token
export async function auth(router, setLogged) {
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
        setLogged(true)
    }
}

export const Main = createContext(null);

export default function Page() {
    const [logged, setLogged] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        id: "",
        title: "",
        priority: "A",
        until: "",
        repeat: false
    })
    
    const router = useRouter()
    auth(router, setLogged)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/tasks", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                if(await response.error == null) {
                    setTodos(await response.data);
                }
            }catch {
                
            }
        })();
    }, []);
    
    const toggleLeft = useRef(false);
    const [layoutLeftStyle, setLayoutLeftStyle] = useState(`${styles.layout__left}`);
    const [cardStyle, setCardStyle] = useState("grid-y grid-y-sm-6 grid-y-md-4 grid-y-xl-3");

    if(logged) {
        return (
            <Main.Provider value={{ todos, setTodos, todo, setTodo }} >
                
                <div className={styles.layout}>
                    <div className={layoutLeftStyle}>
                        <Form/>
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

                                { todos.map(todo => <div key={todo.id} className={cardStyle}>
                                    <Card
                                        id={todo.id}
                                        title={todo.title}
                                        priority={todo.priority}
                                        until={todo.until}
                                        repeat={todo.repeat}
                                    />
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </Main.Provider>
        );
    }else {
        return (
            <div style={{
                backgroundImage: "linear-gradient(102deg, rgba(254, 253, 205, 1) 11.2%, rgb(204 235 221) 91.1%)",
                height: "100%",
            }}>
            </div>
        )
    }
}
