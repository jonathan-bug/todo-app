"use client";

import styles from "@/app/components/check/component.module.css";
import { useEffect, useState } from "react";

export default function Check({values, changeValues, value, check}) {
    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        changeValues({...values, repeat: checked});
    }, [checked]);
    
    useEffect(() => {
        if(checked) {
            setImage("/bx-check.svg");
        }else {
            setImage("");
        }
    }, [checked]);

    useEffect(() => {
        setChecked(check)
    }, [check]);
    
    return (
        <div className={styles.check} onClick={() => setChecked(!checked)}>
            <img src={image}/>
        </div>
    )
}
