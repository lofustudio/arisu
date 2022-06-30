import Navbar from "./Navbar";

export default function Container({ children }: any) {
    return (
        <>
            <Navbar />
            <div className="flex flex-col px-20">
                {children}
            </div>
        </>
    );
}