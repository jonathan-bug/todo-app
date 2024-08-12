import styles from "@/app/components/card/component.module.css";

export default function Card() {
    return (
        <div className={styles.card}>
            <div className={styles.card__left}>
                <div className={styles.card__title}>UUU</div>
                <div className={styles.card__content}>
                    <div className={styles.card__value}>Priority</div>
                    <div className={styles.card__value}>Until</div>
                    <div className={styles.card__value}>Repeat</div>
                </div>
            </div>
            <div className={styles.card__right}>
                <button className={styles.card__button}>
                    <img alt="" src="/bx-check-2.svg"/>
                </button>
                <button className={styles.card__button}>
                    <img alt="" src="/bx-pencil.svg"/>
                </button>
                <button className={styles.card__button}>
                    <img alt="" src="/bx-trash.svg"/>
                </button>
            </div>
        </div>
    )
}
