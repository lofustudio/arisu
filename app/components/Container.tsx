import { AppShell, Button, Center, Container, Title, Text, Stack } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, Link } from "@remix-run/react";
import { FaDiscord } from "react-icons/fa";
import { authenticator } from "~/services/auth.server";
import Navbar from "./Navbar";

export const loader: LoaderFunction = async ({ request, params }) => {
    const profile = authenticator.isAuthenticated(request);
    return {
        profile,
    };
};

export default function AppContainer({ children }: any) {
    const profile = useLoaderData();
    const fetcher = useFetcher();
    return (
        <>
            {profile ? (
                <>
                    <AppShell
                        padding="md"
                        navbar={<Navbar />}
                        styles={(theme) => ({
                            main: {
                                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                            },
                        })}
                    >
                        {children}
                    </AppShell>
                </>
            ) : (
                <>
                    <Container>
                        <Center>
                            <Stack>
                                <Title align="center">
                                    Login
                                </Title>
                                <Text align="center">
                                We only use your Discord information to authenticate you and to identify you as a user. <br />
                                    We do not store any account information on the database. <br /> Please refer to the{" "}
                                    <a href="https://cookiebot.tech/privacy">
                                        Privacy Policy
                                    </a>{" "}
                                    for more information.
                                </Text>
                                <Button px={4} py={2} style={{ transition: "ease-in-out", transitionDuration: "300" }} radius={"md"} leftIcon={<FaDiscord fontSize={"20px"} />} onClick={() => fetcher.submit(null, { method: "post", action: "/auth/discord" })}>
                                    <span>Login with Discord</span>
                                </Button>
                            </Stack>
                        </Center>
                    </Container>
                </>
            )}
        </>
    );
}