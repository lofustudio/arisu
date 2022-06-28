import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import clsx from "clsx";
import { NonFlashOfWrongThemeEls, ThemeProvider, useTheme } from "./contexts/theme";
import type { LoaderFunction } from "@remix-run/node";
import type { Theme } from "./contexts/theme";
import { getThemeSession } from "./utils/theme.server";

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
            <body>
                <div className="text-black ease-in-out bg-white dark:bg-black dark:text-white">
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </div>
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
