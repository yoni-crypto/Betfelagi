import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-2 fixed w-full z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-semibold tracking-wide hover:text-gray-200 transition duration-300"
                >
                    Bet Felagi
                </Link>

                <div className="lg:hidden">
                    <div
                        className="cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="w-5 h-0.5 bg-white mb-1"></div>
                        <div className="w-5 h-0.5 bg-white mb-1"></div>
                        <div className="w-5 h-0.5 bg-white"></div>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-6 text-sm">
                    {user ? (
                        <>
                            <Link
                                to="/"
                                className="hover:text-gray-200 transition duration-300"
                            >
                                Home
                            </Link>
                            <Link
                                to="/create-listing"
                                className="hover:text-gray-200 transition duration-300"
                            >
                                Create Listing
                            </Link>
                            <Link
                                to="/profile"
                                className="hover:text-gray-200 transition duration-300"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full shadow-sm transition duration-300 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-gray-200 transition duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full shadow-sm transition duration-300 text-sm"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
                ></div>
            )}

            <div
                className={`lg:hidden fixed top-0 right-0 w-64 bg-blue-600 bg-opacity-95 transform ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 z-50 shadow-lg h-full`}
            >
                <div className="flex flex-col items-center mt-16 text-sm">
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        &times;
                    </button>
                    {user ? (
                        <>
                            <Link
                                to="/"
                                className="mb-4 hover:text-gray-200 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/create-listing"
                                className="mb-4 hover:text-gray-200 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Create Listing
                            </Link>
                            <Link
                                to="/profile"
                                className="mb-4 hover:text-gray-200 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-sm mb-4 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="mb-4 hover:text-gray-200 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-sm mb-4 transition duration-300"
                                onClick={() => setMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
