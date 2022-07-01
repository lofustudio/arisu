import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request, params }) => {
    return redirect("/dashboard");
};

export default function IndexRoute() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-5xl font-bold">
                Redirecting...
            </h1>
        </div>
    );
}