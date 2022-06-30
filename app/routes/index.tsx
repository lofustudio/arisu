import Container from "~/components/Container";

export default function IndexRoute() {
    return (
        <Container>
            <h1 className="text-5xl font-bold">
                Dashboard
            </h1>
            <p className="text-xl">
                This is the dashboard page.
            </p>
        </Container>
    );
}