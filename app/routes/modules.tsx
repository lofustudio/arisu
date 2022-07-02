import type { LoaderFunction } from "@remix-run/node";
import Container from "~/components/Container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request);
};

export default function ModulesRoute() {
    return (
        <Container>
            <h1 className="text-5xl font-bold">
                Modules
            </h1>
            <p className="text-xl">
                Select a module to get started.
            </p>
        </Container>
    );
}