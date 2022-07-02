import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTheme, Theme } from "~/contexts/theme";
import { authenticator } from "~/services/auth.server";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { BiCommand, BiLogIn, BiLogOut, BiCog, BiTerminal } from "react-icons/bi";
import { MdDashboard, MdViewModule } from "react-icons/md";
import useMediaQuery from "~/hook/useMediaQuery";

export const loader: LoaderFunction = async ({ request }) => {
    const profile = await authenticator.isAuthenticated(request);

    return { profile };
};

function BigNavbar() {
    const profile = useLoaderData();
    const [ theme, setTheme ] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };
    return (
        <>
            <aside className="border-r border-zinc-200 dark:border-zinc-900 w-1/6 flex-col items-start lg:p-8 md:p-4 sm:p-2 min-h-screen" aria-label="Sidebar">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center text-center">
                        <img className="h-8 w-8" src={theme === Theme.LIGHT ? "https://i.imgur.com/vS8XGbu.png" : "https://i.imgur.com/6vWxl4c.png"} />
                    </div>
                    <div className="flex items-center text-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                        <button className="" onClick={toggleTheme}>
                            {theme === Theme.LIGHT ? <BsFillMoonFill /> : <BsFillSunFill />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between min-h-[85vh] flex-wrap">
                    <div>
                        <a href="/dashboard">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdDashboard fontSize={"20px"} />
                                    <span className="font-semibold">Dashboard</span>
                                </div>
                            </button>
                        </a>
                        <a href="/commands">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCommand fontSize={"20px"} />
                                    <span className="font-semibold">Commands</span>
                                </div>
                            </button>
                        </a>
                        <a href="/modules">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdViewModule fontSize={"20px"} />
                                    <span className="font-semibold">Modules</span>
                                </div>
                            </button>
                        </a>
                        <a href="/console">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiTerminal fontSize={"20px"} />
                                    <span className="font-semibold">Console</span>
                                </div>
                            </button>
                        </a>
                        <a href="/settings">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCog fontSize={"20px"} />
                                    <span className="font-semibold">Settings</span>
                                </div>
                            </button>
                        </a>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full mr-1" data-bs-toggle="tooltip" title="bruh" src={`https://cdn.discordapp.com/avatars/${profile.__json.id}/${profile.__json.avatar}.png?size=512`} />
                        </div>
                        <div className="flex flex-row">
                            <a href="/auth/profile">
                                <div className="flex items-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                    <BiCog fontSize={"20px"} />
                                </div>
                            </a>
                            <div className="flex items-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                <BiLogOut fontSize={"20px"} />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function MedNavbar() {
    const profile = useLoaderData();
    const [ theme, setTheme ] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };
    return (
        <>
            <aside className="border-r border-zinc-200 dark:border-zinc-900 w-1/6 flex-col items-start p-4 min-h-screen" aria-label="Sidebar">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center text-center">
                        <img className="h-8 w-8" src={theme === Theme.LIGHT ? "https://i.imgur.com/vS8XGbu.png" : "https://i.imgur.com/6vWxl4c.png"} />
                    </div>
                    <div className="flex items-center text-center rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                        <button className="" onClick={toggleTheme}>
                            {theme === Theme.LIGHT ? <BsFillMoonFill /> : <BsFillSunFill />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between min-h-[85vh] p-2 flex-wrap">
                    <div>
                        <a href="/dashboard">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdDashboard fontSize={"20px"} />
                                    <span className="font-semibold">Dash</span>
                                </div>
                            </button>
                        </a>
                        <a href="/commands">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCommand fontSize={"20px"} />
                                    <span className="font-semibold">Cmds</span>
                                </div>
                            </button>
                        </a>
                        <a href="/modules">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdViewModule fontSize={"20px"} />
                                    <span className="font-semibold">Mods</span>
                                </div>
                            </button>
                        </a>
                        <a href="/console">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiTerminal fontSize={"20px"} />
                                    <span className="font-semibold">Term</span>
                                </div>
                            </button>
                        </a>
                        <a href="/settings">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCog fontSize={"20px"} />
                                    <span className="font-semibold">Conf</span>
                                </div>
                            </button>
                        </a>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img className="h-8 w-8 rounded-full" data-bs-toggle="tooltip" title="bruh" src={`https://cdn.discordapp.com/avatars/${profile.__json.id}/${profile.__json.avatar}.png?size=512`} />
                        </div>
                        <div className="flex flex-col items-center">
                            <a href="/auth/profile">
                                <div className="flex items-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                    <BiCog fontSize={"20px"} />
                                </div>
                            </a>
                            <div className="flex items-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                <BiLogOut fontSize={"20px"} />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function SmolNavbar() {
    const profile = useLoaderData();
    const [ theme, setTheme ] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };
    return (
        <>
            <aside className="border-r border-zinc-200 dark:border-zinc-900 w-1/6 flex-col items-center p-4 sticky" aria-label="Sidebar">
                <div className="flex flex-col items-center justify-between mb-10">
                    <div className="flex flex-col gap-4 items-center text-center">
                        <img className="h-8 w-8" src={theme === Theme.LIGHT ? "https://i.imgur.com/vS8XGbu.png" : "https://i.imgur.com/6vWxl4c.png"} />
                        <button onClick={toggleTheme}>
                            {theme === Theme.LIGHT ? <BsFillMoonFill fontSize={"20px"} /> : <BsFillSunFill fontSize={"20px"} />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between min-h-[85vh] items-center flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                        <a href="/dashboard">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 py-2 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdDashboard fontSize={"20px"} />
                                </div>
                            </button>
                        </a>
                        <a href="/commands">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 py-2 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCommand fontSize={"20px"} />
                                </div>
                            </button>
                        </a>
                        <a href="/modules">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 py-2 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdViewModule fontSize={"20px"} />
                                </div>
                            </button>
                        </a>
                        <a href="/console">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 py-2 rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiTerminal fontSize={"20px"} />
                                </div>
                            </button>
                        </a>
                        <a href="/settings">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 py-2 items-center rounded-xl transition ease-in-out 300 w-full mb-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCog fontSize={"20px"} />
                                </div>
                            </button>
                        </a>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center">
                            <img className="h-8 w-8 rounded-full" data-bs-toggle="tooltip" src={`https://cdn.discordapp.com/avatars/${profile.__json.id}/${profile.__json.avatar}.png?size=512`} />
                        </div>
                        <a href="/auth/profile">
                            <div className="flex items-center py-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                <BiCog fontSize={"20px"} />
                            </div>
                        </a>
                        <Form action="/auth/logout" method="post">
                            <div className="flex items-center mb-4 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                <BiLogOut fontSize={"20px"} />
                            </div>
                        </Form>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default function Navbar() {
    const isLargerThan900 = useMediaQuery(900);
    const isLargerThan700 = useMediaQuery(700);
    return (
        <>
            {isLargerThan900 ? (
                <BigNavbar />
            ) : (
                <>
                    {
                        isLargerThan700 ? (
                            <MedNavbar />
                        ) : (
                            <SmolNavbar />
                        )
                    }
                </>
            )}
        </>
    );
}
