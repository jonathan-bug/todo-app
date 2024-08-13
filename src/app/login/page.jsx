import styles from "@/app/login/page.module.css";
import styles2 from "@/app/components/form/component.module.css";

export default function Page() {
    return (
        <div class={styles.container}>
            <div class={`${styles2.form} ${styles.form_}`}>
                <div class={styles2.form__group}>
                    <label className={styles2.form__label}>User</label>
                    <input className={styles2.form__input} name="" type="text" value=""/>
                </div>
                <div class={styles2.form__group}>
                    <label className={styles2.form__label}>Password</label>
                    <input className={styles2.form__input} name="" type="text" value=""/>
                </div>
                
                <div class={styles2.form__group}>
                    <div className={styles2.form__group_button}>
                        <button className={styles2.form__button}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
