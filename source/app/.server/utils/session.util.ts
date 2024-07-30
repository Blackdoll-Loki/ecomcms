// app/services/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
import { environment } from "../constants/environment.constants";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", 
    sameSite: "lax",
    path: "/", 
    httpOnly: true, 
    secrets: [environment.cookie.secret],
    secure: environment.environment.isProduction, 
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;