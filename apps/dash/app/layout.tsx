import "../styles/globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body>
                <Providers>
                    <div className="p-8">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
