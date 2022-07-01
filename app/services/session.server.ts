import { createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [process.env.SESSION_SECRET as string],
        secure: process.env.NODE_ENV === "production",
    },
});

export let { getSession, commitSession, destroySession } = sessionStorage;