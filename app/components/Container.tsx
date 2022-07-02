import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { FaDiscord } from "react-icons/fa";
import { RiParkingFill } from "react-icons/ri";
import useMediaQuery from "~/hook/useMediaQuery";
import { authenticator } from "~/services/auth.server";
import Navbar from "./Navbar";

export const loader: LoaderFunction = async ({ request, params }) => {
    const profile = authenticator.isAuthenticated(request);
    return {
        profile,
    };
};

export default function Container({ children }: any) {
    const profile = useLoaderData();
    return (
        <>
            {profile ? (
                <>
                    <div className="flex flex-row">
                        <Navbar />
                        <div className="flex flex-col p-10 w-5/6">
                            {children}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center h-screen">
                        <div className="min-w-[36vw] mix-h-[50vh] rounded-xl p-8 flex flex-col items-center gap-8">
                            <div>
                                <h1 className="text-center font-bold text-4xl mb-4">
                                Log in
                                </h1>
                                <p className="font-light text-center">
                                We only use your Discord information to authenticate you and to identify you as a user. <br />
                                    We do not store any account information on the database. <br /> Please refer to the{" "}
                                    <a href="https://cookiebot.tech/privacy">
                                        Privacy Policy
                                    </a>{" "}
                                    for more information.
                                </p>
                            </div>

                            <Form action="/auth/discord" method="post">
                                <button className="text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 py-2 px-4 rounded-xl transition ease-in-out 300">
                                    <div className="flex flex-row gap-2 items-center">
                                        <FaDiscord fontSize={"20px"} />
                                        <span className="font-semibold">Login with Discord</span>
                                    </div>
                                </button>
                            </Form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}