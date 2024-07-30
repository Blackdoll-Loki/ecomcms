import { json, LoaderFunctionArgs } from "@remix-run/node";
import { EAdminNavigation } from "../constants/navigation.constant";
import { authenticator } from "../service/auth.service";

export async function adminDashboardLoader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });
  return json ({ user })
};