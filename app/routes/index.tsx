import { Center, Title } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export default function IndexRoute() {
    return (
        <>
            <Center>
                <Title>
                    The dashboard is not avalible right now. Please check again later.
                </Title>
            </Center>
        </>
    );
}