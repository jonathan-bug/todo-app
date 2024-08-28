import { toast } from "react-toastify";
import styles from "@/app/components/card/component.module.css";
import axios from "axios";
import { useContext } from "react";
import { Main } from "@/app/page";

export default function Card({id, title, priority, until, repeat}) {
    const main = useContext(Main);

    async function deleteTodo(id) {
        try {
            const response = await axios.delete("/api/tasks/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            if(response.data.error == null) {
                toast.success("Success!", {
                    position: "top-right"
                });
                main.setTodos(main.todos.filter(todo => todo.id != id));
            }else {
                toast.error("An error has occurred!", {
                    position: "top-right"
                });
            }
        }catch {
            
        }
    }

    async function doneTodo() {
        try {
            if(repeat) {
                const newDate = new Date(until.replace("-", "/"));
                newDate.setDate(newDate.getDate() + 1);
                
                const todo = {
                    id,
                    title,
                    priority,
                    until: newDate.toISOString().split("T")[0],
                    repeat
                };
                
                const response = await axios.put("/api/tasks", todo, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })

                if(response.data.err == null) {
                    toast.success("Success", {
                        position: "top-right"
                    });
                    main.setTodos(main.todos.map(todo_ => {
                        if(todo_.id == todo.id) {
                            return todo;
                        }else {
                            return todo_;
                        }
                    }));
                }else {
                    toast.error("An error has occurred!", {
                        position: "top-right"
                    });
                }
            }else {
                const response = await axios.delete(`/api/tasks/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                if(response.data.err == null) {
                    toast.success("Success", {
                        position: "top-right"
                    });
                    main.setTodos(main.todos.filter(todo => todo.id != id));
                }else {
                    toast.error("An error has occurred!", {
                        position: "top-right"
                    });
                }
            }
        }catch {
            
        }
    }
    
    return (
        <div className={styles.card}>
            <div className={styles.card__left}>
                <div className={styles.card__title}>{title}</div>
                <div className={styles.card__content}>
                    <div className={styles.card__value}>Priority {priority}</div>
                    <div className={styles.card__value}>Until {until}</div>
                    <div className={styles.card__value}>Repeat {(repeat)? "Yes": "No"}</div>
                </div>
            </div>
            
            <div className={styles.card__right}>
                <button className={styles.card__button}
                        onClick={doneTodo}>
                    <img alt="" src="/bx-check-2.svg"/>
                </button>
                <button className={styles.card__button} onClick={() => {
                    main.setTodo({
                        id,
                        title,
                        priority,
                        until,
                        repeat
                    });
                }}>
                    <img alt="" src="/bx-pencil.svg"/>
                </button>
                
                <button className={styles.card__button} onClick={() => deleteTodo(id)}>
                    <img alt="" src="/bx-trash.svg"/>
                </button>
            </div>
        </div>
    )
}
