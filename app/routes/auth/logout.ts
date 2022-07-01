import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export let action: ActionFunction = async ({ request, params }) => {
    await authenticator.logout(request, { redirectTo: "/dashboard " });
};