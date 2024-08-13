import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder()
    .encode("u");

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("300 sec from now")
        .sign(key)
}

export async function decrypt(token) {
    const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"]
    });

    return payload;
}

