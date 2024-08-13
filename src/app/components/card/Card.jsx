import styles from "@/app/components/card/component.module.css";
import axios from "axios";

export default function Card({setCheck, setJob, values, setValues, id, title, priority, until, repeat}) {
    function convertDate(date) {
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        let day = date.getDay().toString();

        day = (day.length == 1)? "0" + day: day;
        month = (month.length == 1)? "0" + month: month;

        return `${year}-${month}-${day}`;
    }

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
