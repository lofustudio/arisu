import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
    useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import clsx from "clsx";
import { NonFlashOfWrongThemeEls, ThemeProvider, useTheme } from "./contexts/theme";
import type { LoaderFunction } from "@remix-run/node";
import type { Theme } from "./contexts/theme";
import { getThemeSession } from "./utils/theme.server";

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return (
        <div className="h-screen justify-center">
            <h1>There was an error</h1>
            <p>{error.message}</p>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    let message;
    switch (caught.status) {
    case 401:
        message = (
            <>
                <p>
                    Oops! Looks like you tried to visit a page that you do not have access
                    to.
                </p>
            </>
        );
        break;
    case 404:
        message = (
            <p>
                Oops! Looks like you tried to visit a page that does not exist.
            </p>
        );
        break;

    default:
        throw new Error(caught.data || caught.statusText);
    }

    return (
        <div className="h-screen justify-center">
            <h1>
                {caught.status}: {caught.statusText}
            </h1>
            {message}
        </div>
    );
}

export type LoaderData = {
    theme: Theme | null;
}

export const loader: LoaderFunction = async ({ request }) => {
    const themeSession = await getThemeSession(request);

    const data: LoaderData = {
        theme: themeSession.getTheme(),
    };

    return data;
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Dashboard",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export function App() {
    const data = useLoaderData<LoaderData>();
    const [theme] = useTheme();
    return (
        <html lang="en" className={clsx(theme)}>
            <head>
                <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
                <Meta />
                <Links />
            </head>
            <body className="bg-[#f8f9f9] dark:bg-black text-black dark:text-white">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export default function AppWithProviders() {
    const data = useLoaderData<LoaderData>();

    return (
        <ThemeProvider specifiedTheme={data.theme}>
            <App />
        </ThemeProvider>
    );
}
