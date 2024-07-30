import { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/./.server/utils/session.util";
import { FormStrategy } from "remix-auth-form";
import { comparePassword, hashPassword } from "../utils/auth.util";
import { prisma } from "../utils/prisma.util";
import invariant from "tiny-invariant";

export const ADMIN_AUTH_STRATEGY = 'admin-pass'


// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const findUser = async(email: string, password: string): Promise<User> => {
  const user = await prisma.user.findFirstOrThrow({where: { email: email} });
  invariant(await comparePassword(password, user.password),  "Wrong password");
  return user;
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    // Here you can use `form` to access and input values from the form.
    // and also use `context` to access more things from the server
    let email = form.get("email"); 
    let password = form.get("password");

    // You can validate the inputs however you want
    invariant(typeof email === "string",  "email must be a string");
    invariant(email.length > 0, "email must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    // And finally, you can find, or create, the user
   return await findUser(email, password);
  }),
  ADMIN_AUTH_STRATEGY
);

