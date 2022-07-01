import { Menu, Transition } from "@headlessui/react";
import type { LoaderFunction } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { useTheme, Theme } from "~/contexts/theme";
import { authenticator } from "~/services/auth.server";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export const loader: LoaderFunction = async ({ request }) => {
    const profile = await authenticator.isAuthenticated(request);

    return { profile };
};

export default function Navbar() {
    const profile = useLoaderData();
    const fetcher = useFetcher();
    const [ theme, setTheme ] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };
    return (
        <>
            <nav className="z-50 flex justify-between items-center mx-10 px-4 py-2 my-10 backdrop-blur-sm dark:bg-black/30 bg-white/30">
                <div>
                    <a href="/dashboard" className="focus:outline-none ml-10 transition duration-200 ease-in-out rounded-lg p-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                        Dashboard
                    </a>
                    <a href="/commands" className="focus:outline-none ml-10 transition duration-200 ease-in-out rounded-lg p-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                        Commands
                    </a>
                    {profile ? (
                        <a href="/settings" className="focus:outline-none ml-10 transition duration-200 ease-in-out rounded-lg p-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                            Settings
                        </a>
                    ) : null}
                </div>
                <div className="flex flex-row">
                    <button className="focus:outline-none ml-10 transition duration-200 ease-in-out rounded-full px-4 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700" onClick={toggleTheme}>
                        {theme === Theme.LIGHT ? <BsFillMoonFill /> : <BsFillSunFill />}
                    </button>
                    {profile ? (
                        <>
                            <Menu>
                                <Menu.Button>
                                    <img src={`https://cdn.discordapp.com/avatars/${profile.__json.id}/${profile.__json.avatar}.png`} alt="avatar" width={"48px"} className="rounded-full ml-10 border-2 border-gray-300" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-16 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:ring-zinc-700 dark:bg-zinc-800 dark:divide-zinc-600 dark:text-white">
                                        <Menu.Item>
                                            {({ active }) => {
                                                return (
                                                    <a href="/auth/profile">
                                                        <button
                                                            className={`${active ? "bg-gray-200 dark:bg-zinc-600" : "text-gray-900 dark:text-white"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm transition ease-in-out 300`}
                                                        >
                                                            Profile
                                                        </button>
                                                    </a>
                                                );
                                            }}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => {
                                                return (
                                                    <button
                                                        className={`${active ? "bg-gray-200 dark:bg-zinc-600" : "text-gray-900 dark:text-white"
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition ease-in-out 300`}
                                                        onClick={() => {
                                                            fetcher.submit(null, { action: "/auth/logout", method: "post" });
                                                        }}
                                                    >
                                                        Logout
                                                    </button>
                                                );
                                            }}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Form action="/auth/discord" method="post">
                                <button className="focus:outline-none ml-10 transition duration-200 ease-in-out rounded-lg p-1 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                                    Login
                                </button>
                            </Form>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}