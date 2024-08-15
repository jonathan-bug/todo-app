"use client";

import styles from "@/app/components/check/component.module.css";
import { useEffect, useState, useContext } from "react";
import { Main } from "@/app/page";

export default function Check() {
    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState("");
    
    const main = useContext(Main);
    
    useEffect(() => {
        setChecked(main.todo.repeat);
    }, [main.todo.repeat]);
    
    useEffect(() => {
        setImage((checked)? "/bx-check.svg": null);
    }, [checked]);
    
    return (
        <div className={styles.check} onClick={() => main.setTodo({...main.todo, repeat: !main.todo.repeat})}>
            <img src={image}/>
        </div>
    )
}
