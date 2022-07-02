import type { LoaderFunction } from "@remix-run/node";
import Container from "~/components/Container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request);
};

export default function CommandsRoute() {
    return (
        <Container>
            <h1 className="text-5xl font-bold">
                Commands
            </h1>
            <p className="text-xl">
                The full list of commands, with their descriptions, modules and other information about them.
            </p>
        </Container>
    );
}