import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from "@remix-run/react";
import { Center, Container, MantineProvider, Text, Title } from "@mantine/core";

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return (
        <Container style={{ justifyContent: "center", minHeight: "100%" }}>
            <Center>
                <Title>There was an error</Title>
                <Text>{error.message}</Text>
            </Center>
        </Container>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    let message;
    switch (caught.status) {
    case 401:
        message = (
            <>
                <Text>
                    Oops! Looks like you tried to visit a page that you do not have access
                    to.
                </Text>
            </>
        );
        break;
    case 404:
        message = (
            <Text>
                Oops! Looks like you tried to visit a page that does not exist.
            </Text>
        );
        break;

    default:
        throw new Error(caught.data || caught.statusText);
    }

    return (
        <Container style={{ justifyContent: "center", minHeight: "100%" }}>
            <Title>
                {caught.status}: {caught.statusText}
            </Title>
            {message}
        </Container>
    );
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Dashboard",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [];
}

export function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export default function AppWithProviders() {
    return (
        <MantineProvider theme={{
            colorScheme: "dark",
        }}>
            <App />
        </MantineProvider>
    );
}
