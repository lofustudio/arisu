import type { LoaderFunction } from "@remix-run/node";
import Container from "~/components/Container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request);
};

export default function IndexRoute() {
    return (
        <Container>
            <h1 className="text-5xl font-bold">
                Dashboard
            </h1>
            <p className="text-xl">
                This is the dashboard page.
            </p>
        </Container>
    );
}