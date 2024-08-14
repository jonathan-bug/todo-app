import styles from "@/app/components/card/component.module.css";
import axios from "axios";

export default function Card({setCheck, setJob, values, setValues, id, title, priority, until, repeat}) {
    return (
        <div className={styles.card}>
            <div className={styles.card__left}>
                <div className={styles.card__title}>{title}</div>
                <div className={styles.card__content}>
                    <div className={styles.card__value}>Priority {priority}</div>
                    <div className={styles.card__value}>Until {until}</div>
                    <div className={styles.card__value}>Repeat {repeat}</div>
                </div>
            </div>
            
            <div className={styles.card__right}>
                <button className={styles.card__button}
                        onClick={async () => {
                            if(repeat == "Yes") {
                                const untilDate = new Date(until.replace("-", "/"));
                                untilDate.setDate(untilDate.getDate() + 1)
                                const stringDate = untilDate.toISOString()
                                
                                try {
                                    const task = {
                                        id,
                                        title,
                                        priority,
                                        until: stringDate.split("T")[0],
                                        repeat: true
                                    }
                                    
                                    const res = await axios.put("/api/tasks", task, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    })

                                    if(!res.data.err) {
                                        setValues(values.filter(value => value.id != id));
                                        setValues(values.map(value => {
                                            if(value.id == task.id) {
                                                return task
                                            }else {
                                                return value
                                            }
                                        }))
                                    }
                                }catch {}
                            }else {
                                try {
                                    const res = await axios.delete(`/api/tasks/${id}`, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    });

                                    if(!res.data.err) {
                                        setValues(values.filter(value => value.id != id));
                                    }
                                }catch {}
                            }
                        }}
                >
                    <img alt="" src="/bx-check-2.svg"/>
                </button>
                <button className={styles.card__button} onClick={() => {
                    setCheck((repeat == "Yes")? true: false)
                    setJob({
                        id,
                        title,
                        priority,
                        until,
                        repeat: (repeat == "Yes")? true: false
                    });
                }}>
                    <img alt="" src="/bx-pencil.svg"/>
                </button>
                <button className={styles.card__button}
                        onClick={async () => {
                            try {
                                const res = await axios.delete(`/api/tasks/${id}`, {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                });

                                if(!res.data.err) {
                                    setValues(values.filter(value => value.id != id));
                                }
                            }catch (err){
                                console.log(err.message)
                            }
                        }}
                >
                    <img alt="" src="/bx-trash.svg"/>
                </button>
            </div>
        </div>
    )
}
