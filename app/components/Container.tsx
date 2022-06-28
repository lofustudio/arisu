export default function Container({ children }: any) {
    return (
        <>
            <div className="w-screen h-screen">
                {children}
            </div>
        </>
    );
}