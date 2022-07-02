import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request, params }) => {
    return redirect("/dashboard");
};

export default function IndexRoute() {
    return (
        <>
            <p>
                Loading...
            </p>
        </>
    );
}