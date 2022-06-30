import { useTheme, Theme } from "~/contexts/theme";

export default function Navbar() {
    const [ , setTheme ] = useTheme();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    };
    return (
        <>
            <nav className="z-50 flex justify-between items-center mx-10 px-4 py-2 my-10 backdrop-blur-sm dark:bg-black/30 bg-white/30">
                <div>
                    <a href="/" className="focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-blue-200">
                        Dashboard
                    </a>
                    <a href="/commands" className="focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-blue-200">
                        Commands
                    </a>
                    <a href="/settings" className="focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-blue-200">
                        Settings
                    </a>
                </div>
                <div>
                    <button className="focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-blue-200" onClick={toggleTheme}>
                        Theme
                    </button>
                </div>
            </nav>
        </>
    );
}