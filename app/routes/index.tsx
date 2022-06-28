import Container from "~/components/Container";
import { Theme, useTheme } from "~/contexts/theme";

export default function IndexRoute() {
    const [ , setTheme ] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };

    return (
        <Container>
            <button onClick={toggleTheme}>Toggle</button>
        </Container>
    );
}