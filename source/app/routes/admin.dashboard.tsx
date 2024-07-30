import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/.server/admin/service/auth.service";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/auth/login",
  });
  return json ({ user })
};

export default function Index() {
  const data =  useLoaderData<typeof loader>()

  return (
    <div className="font-sans p-4">
      <h2 className="text-3xl">Welcome to Admin</h2>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
