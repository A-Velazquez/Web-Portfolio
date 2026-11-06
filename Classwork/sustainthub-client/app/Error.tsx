const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
            <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Try Again
            </button>
        </div>
    );
};

export default Error;