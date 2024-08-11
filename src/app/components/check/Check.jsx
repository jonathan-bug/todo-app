"use client";

import styles from "@/app/components/check/component.module.css";
import { useEffect, useState } from "react";

export default function Check() {
    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        if(checked) {
            setImage("/bx-check.svg");
        }else {
            setImage("");
        }
    }, [checked]);
    
    return (
        <div className={styles.check} onClick={() => setChecked(!checked)}>
            <img src={image}/>
        </div>
    )
}
