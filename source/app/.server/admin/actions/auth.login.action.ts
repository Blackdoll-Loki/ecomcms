import { ActionFunctionArgs } from "@remix-run/node";
import { EAdminNavigation } from "../constants/navigation.constant";
import { ADMIN_AUTH_STRATEGY, authenticator } from "../service/auth.service";

export async function AdminAuthLoginAction({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate( ADMIN_AUTH_STRATEGY,request, {
    successRedirect: EAdminNavigation.dashboard,
    failureRedirect: EAdminNavigation.authLogin,
  })
};