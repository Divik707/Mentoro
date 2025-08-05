export const LandingPage = () => {
    return (
        <div className=" bg-neutral-600 selection:text-amber-200 font-sans">
            {/* Navbar */}
            <div className="flex justify-between items-center px-4 py-4">
                <h1 className="text-5xl font-extrabold cursor-pointer text-neutral-100 hover:text-7xl duration-1000">
                    Mentoro
                </h1>
                <div className="flex items-center gap-4 text-neutral-100">
                    <p className="hover:text-neutral-300 duration-300 cursor-pointer">Explore</p>
                    <p className="hover:text-neutral-300 duration-300 cursor-pointer">Courses</p>
                    <button className="bg-neutral-200 text-neutral-900 py-1 px-4 rounded-xl hover:bg-neutral-600 hover:text-neutral-100 duration-300">
                        Login
                    </button>
                    <button className="bg-neutral-200 text-neutral-900 py-1 px-4 rounded-xl hover:bg-neutral-600 hover:text-neutral-100 duration-300">
                        Start New
                    </button>
                </div>
            </div>

            {/* Headings */}
            <div className="flex flex-col items-center text-6xl text-neutral-100 mt-10 text-center space-y-2">
                <h1 className="hover:text-7xl duration-1000">Learning Teaching</h1>
                <h1 className="hover:text-7xl duration-1000">made</h1>
                <h1 className="hover:text-7xl duration-1000">easy and approachable</h1>
            </div>
        </div>
    );
};
