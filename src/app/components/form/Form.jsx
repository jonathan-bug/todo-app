"use client";

import { toast } from "react-toastify";
import styles from "@/app/components/form/component.module.css";
import Check from "@/app/components/check/Check";
import axios from "axios";
import { Main } from "@/app/page";
import { useContext } from "react";

export default function Form() {
    const priorities = [
        "A",
        "B",
        "C",
        "D"
    ];

    const main = useContext(Main);

    async function saveTodo() {
        try {
            if(main.todo.id == "") {
                const response = await axios.post("/api/tasks", main.todo, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                
                if(response.data.err == null) {
                    toast.success("Success!", {
                        position: "top-right"
                    })
                    main.setTodos([...main.todos, {...main.todo, id: response.data.id}]);
                    main.setTodo({id: "", title: "", priority: "A", until: "", repeat: false});
                }else {
                    toast.error("An error has occurred!", {
                        position: "top-right"
                    })
                }
            }else {
                const response = await axios.put("/api/tasks", main.todo, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })

                if(response.data.err == null) {
                    toast.success("Success!", {
                        position: "top-right"
                    })
                    main.setTodos(main.todos.map(todo => {
                        if(todo.id == main.todo.id) {
                            return {...main.todo}
                        }else {
                            return todo
                        }
                    }))
                    main.setTodo({id: "", title: "", priority: "A", until: "", repeat: false});
                }else {
                    toast.error("An error has occurred!", {
                        position: "top-right"
                    })
                }
            }
        }catch {
            
        }
    }
    
    return (
        <div className={styles.form}>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Task</label>
                <input className={styles.form__input} name="" type="text" placeholder="Enter your task"
                       onChange={event => main.setTodo({...main.todo, title: event.target.value})}
                       value={main.todo.title}/>
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Priority</label>
                <select className={styles.form__input} id="" name=""
                        onChange={event => main.setTodo({...main.todo, priority: event.target.value})}
                        value={main.todo.priority}>
                    {priorities.map(priority =>
                        <option key={priority} value={priority}>{priority}</option>
                    )}
                </select>
            </div>
            
            <div className={styles.form__group}>
                <label className={styles.form__label}>Until</label>
                <input className={styles.form__input} name="" type="date" placeholder="Enter your task"
                       onChange={event => main.setTodo({...main.todo, until: event.target.value})}
                       value={main.todo.until}
                />
            </div>
            <div className={styles.form__group}>
                <label className={styles.form__label}>Repeat</label>
                <Check/>
            </div>
            <div className={styles.form__group}>
                <div className={styles.form__group_button}>
                    <button
                        className={`${styles.form__button} ${styles.form__button_solid}`}
                        onClick={() => { main.setTodo({id: "", title: "", priority: "A", until: "", repeat: false})}}>
                        Clear
                    </button>
                    <button className={styles.form__button} onClick={saveTodo}>Save</button>
                </div>
            </div>
        </div>
    )
}
