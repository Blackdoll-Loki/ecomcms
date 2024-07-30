import { json, LoaderFunctionArgs } from "@remix-run/node";
import { EAdminNavigation } from "../constants/navigation.constant";
import { authenticator } from "../service/auth.service";
import { commitSession, getSession } from "../utils/session.util";

export async function adminAuthLoader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: EAdminNavigation.dashboard,
  });
  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json<{ error?: { message: string }}>({ error }, {
    headers:{
      'Set-Cookie': await commitSession(session) // You must commit the session whenever you read a flash
    }
  });
};