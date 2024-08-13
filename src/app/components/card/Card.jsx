import styles from "@/app/components/card/component.module.css";
import axios from "axios";

export default function Card({values, setValues, id, title, priority, until, repeat}) {
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
                <button className={styles.card__button}>
                    <img alt="" src="/bx-check-2.svg"/>
                </button>
                <button className={styles.card__button} onClick={() => {
                    setValues({
                        id,
                        title,
                        priority,
                        until,
                        repeat
                    });
                }}>
                    <img alt="" src="/bx-pencil.svg"/>
                </button>
                <button className={styles.card__button}
                        onClick={async () => {
                            const res = await axios.delete(`/api/tasks/${id}`);

                            if(!res.data.err) {
                                setValues(values.filter(value => value.id != id));
                            }
                        }}
                >
                    <img alt="" src="/bx-trash.svg"/>
                </button>
            </div>
        </div>
    )
}
