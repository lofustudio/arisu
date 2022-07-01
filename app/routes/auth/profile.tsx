import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/Container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/auth/login",
    });
};

export default function Profile() {
    const profile = useLoaderData();
    return (
        <>
            <Container>
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className="text-5xl font-bold">
                            Profile
                        </h1>
                        <p>
                            View your profile.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <img src={`https://cdn.discordapp.com/avatars/${profile.__json.id}/${profile.__json.avatar}.webp?size=128`} alt="profile" className="rounded-full" width="128px" height="128px" />
                        <h1 className="text-4xl font-bold pb-2">
                            {profile.__json.username}#{profile.__json.discriminator}
                        </h1>
                        <p>
                            {profile.__json.email}
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
}