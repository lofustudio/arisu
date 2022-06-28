import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useFetcher } from "@remix-run/react";

enum Theme {
    DARK = "dark",
    LIGHT = "light"
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getPreferredTheme = () => (window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT);

const clientThemeCode = `
// what are you doing here?
// this is a script that runs if you dont have a theme set in your cookies, nothing special. 
// If you select a theme, then I'll know what you want in the future and you'll not see this
// script anymore. while you're here you might aswell, follow me on twitter
// https://tygr.dev/twitter
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // Warn the user that the app is broken and tell tyger they need to fix it, smh bad dev
    console.warn(
      "Hi there, could you let me know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "Hey, could you let me know you're seeing this message? Thanks!",
    );
  }
})();
`;

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
    const [theme] = useTheme();
    return (
        <>
            <meta name="color-scheme" content={theme === "light" ? "light dark" : "dark light"} />
            {ssrTheme ? null : <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />}
        </>
    );
}


function ThemeProvider({ children, specifiedTheme }: { children: ReactNode, specifiedTheme: Theme | null }) {
    const [ theme, setTheme ] = useState<Theme | null>(() => {
        if (specifiedTheme)
            if (themes.includes(specifiedTheme))
                return specifiedTheme;
            else
                return null;

        if (typeof document === "undefined")
            return null;


        return getPreferredTheme();
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(prefersDarkMQ);
        const handleChange = () => {
            setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);


    const persistTheme = useFetcher();

    const persistThemeRef = useRef(persistTheme);
    useEffect(() => {
        persistThemeRef.current = persistTheme;
    }, [persistTheme]);

    const mountRun = useRef(false);

    useEffect(() => {
        if (!mountRun.current) {
            mountRun.current = true;
            return;
        }
        if (!theme)
            return;


        persistThemeRef.current.submit({ theme }, { action: "api/set-theme", method: "post" });
    }, [theme]);


    return <ThemeContext.Provider value={[ theme, setTheme ]}>{children}</ThemeContext.Provider>;
}

function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");


    return context;
}

const themes: Array<Theme> = Object.values(Theme);


function isTheme(value: unknown): value is Theme {
    return typeof value === "string" && themes.includes(value as Theme);
}

export { isTheme, NonFlashOfWrongThemeEls, Theme, ThemeProvider, useTheme };