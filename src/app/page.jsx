import styles from "@/app/page.module.css";
import Form from "./components/form/Form";

export default function Page() {
    return (
        <div className={styles.layout}>
            <div className={styles.layout__left}>
                <Form/>
            </div>
            <div className={styles.layout__right}>
                <div className="grid-container">
                    <div className="grid-x">
                        <div className="grid-y">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
