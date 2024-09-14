import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "@/app/components/auth/component.module.css";
import axios from "axios";

// render when the auth is loading 
function Loading() {
    return (
        <div className={style.auth}>
        </div>
    );
}

// render the page if auth or show a loading page while auth
export default function Auth({ children }) {
    const [login, setLogin] = useState(false);
    const router = useRouter();

    // auth the user
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const res = await axios.post("/api/auth", {}, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            const newToken = await res.data.token;

            // if can't request a new token then move to login
            if(newToken == null) {
                router.push("/login");
            }else {
                localStorage.setItem("token", newToken);
                setLogin(true);
            }
        })();
    }, []);

    // while auth show a loading
    if(login == true) {
        return children;
    }else {
        return <Loading />
    }
}
