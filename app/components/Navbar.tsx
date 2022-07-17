import type { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { BiCommand, BiLogOut, BiCog, BiTerminal } from "react-icons/bi";
import { MdDashboard, MdViewModule } from "react-icons/md";
import { Avatar, Button, Navbar, Stack } from "@mantine/core";

export const loader: LoaderFunction = async ({ request }) => {
    const profile = await authenticator.isAuthenticated(request);

    return { profile };
};

export default function AppNavbar() {
    const profile = useLoaderData();
    const fetcher = useFetcher();
    return (
        <>
            <Navbar width={{ base: 300 }} height={"full"} p="md">
                <Navbar.Section>
                    Cookie
                </Navbar.Section>
                <Navbar.Section grow mt="md" pb={"md"}>
                    <Stack py={"sm"}>
                        <Button>
                            Dashboard
                        </Button>
                        <Button>
                            Commands
                        </Button>
                        <Button>
                            Modules
                        </Button>
                        <Button>
                            Terminal
                        </Button>
                        <Button>
                            Settings
                        </Button>
                    </Stack>
                </Navbar.Section>
                <Navbar.Section>
                    <Avatar src={`https://cdn.discordapp.com/avatars/${profile?.id}/${profile?.__json.avatar}?size=512`} radius={"xl"} size="md" />
                </Navbar.Section>
            </Navbar>
        </>
    );
}