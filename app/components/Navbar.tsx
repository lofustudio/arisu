import type { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useTheme, Theme } from "~/contexts/theme";
import { authenticator } from "~/services/auth.server";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { BiCommand, BiLogOut, BiCog, BiTerminal } from "react-icons/bi";
import { MdDashboard, MdViewModule } from "react-icons/md";

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
            <aside className="border-r border-zinc-200 dark:border-zinc-900 w-1/5 flex-col lg:p-8 p-4 min-h-screen fixed" aria-label="Sidebar">
                <div className="flex flex-col gap-2 md:flex-row items-center justify-between mb-10">
                    <div className="flex items-center text-center">
                        <img className="h-8 w-8" src={theme === Theme.LIGHT ? "https://i.imgur.com/vS8XGbu.png" : "https://i.imgur.com/6vWxl4c.png"} />
                    </div>
                    <div className="flex items-center text-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                        <button onClick={toggleTheme}>
                            {theme === Theme.LIGHT ? <BsFillMoonFill /> : <BsFillSunFill />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start justify-between min-h-[82.5vh]">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <a href="/dashboard">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full p-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdDashboard fontSize={"20px"} />
                                    <span className="font-semibold hidden lg:block">Dashboard</span>
                                    <span className="font-semibold hidden md:block lg:hidden">Dash</span>
                                </div>
                            </button>
                        </a>
                        <a href="/commands">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full p-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCommand fontSize={"20px"} />
                                    <span className="font-semibold hidden lg:block">Commands</span>
                                    <span className="font-semibold hidden md:block lg:hidden">Cmds</span>
                                </div>
                            </button>
                        </a>
                        <a href="/modules">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full p-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <MdViewModule fontSize={"20px"} />
                                    <span className="font-semibold hidden lg:block">Modules</span>
                                    <span className="font-semibold hidden md:block lg:hidden">Mods</span>
                                </div>
                            </button>
                        </a>
                        <a href="/console">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full p-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiTerminal fontSize={"20px"} />
                                    <span className="font-semibold hidden lg:block">Terminal</span>
                                    <span className="font-semibold hidden md:block lg:hidden">Term</span>
                                </div>
                            </button>
                        </a>
                        <a href="/settings">
                            <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition ease-in-out 300 w-full p-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <BiCog fontSize={"20px"} />
                                    <span className="font-semibold hidden lg:block">Config</span>
                                    <span className="font-semibold hidden md:block lg:hidden">Conf</span>
                                </div>
                            </button>
                        </a>

                    </div>
                    <div className="flex flex-col gap-2 md:flex-row items-center md:justify-between w-full">
                        <div className="flex items-center text-center">

                            <img className="h-8 w-8 rounded-full" src={`https://cdn.discordapp.com/avatars/${profile.__json.id}/${profile.__json.avatar}.png?size=512`} />

                        </div>

                        <div className="flex flex-col md:flex-row">
                            <a href="/auth/profile">
                                <div className="flex items-center text-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                    <BiCog fontSize={"20px"} />
                                </div>
                            </a>
                            <a onClick={() => {fetcher.submit(null, { action: "/auth/logout", method: "post" });}}>
                                <div className="flex items-center text-center p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                    <BiLogOut fontSize={"20px"} />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}