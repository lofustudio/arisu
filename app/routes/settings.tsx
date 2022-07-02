import type { LoaderFunction } from "@remix-run/node";
import Container from "~/components/Container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request);
};

export default function SettingsRoute() {
    return (
        <Container>
            <h1 className="text-5xl font-bold">
                Settings
            </h1>
            <p className="text-xl">
                View, edit, and manage your settings, config and other sensitive information.
            </p>
        </Container>
    );
}