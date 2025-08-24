import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { FaHome, FaPlus, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaGlobe, FaUserCircle, FaSearch, FaFilter } from 'react-icons/fa';

const Navbar = ({ filters, onFilterChange, onSearch, isScrolled, showCompactSearch }) => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setUserMenuOpen(false);
    };

    const handleSearch = () => {
        // Trigger search with current filters
        onSearch(filters);
    };

    const handleFilterChange = ({ name, value }) => {
        onFilterChange({ name, value });
    };

    return (
        <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 font-['Inter'] ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container mx-auto px-4">
                <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-24' : 'h-16'}`}>
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-2xl font-black tracking-tight"
                    >
                        <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                            <FaHome className="text-white text-sm" />
                        </div>
                        <span className="bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent font-['Dancing_Script'] font-semibold text-3xl italic">
                            HomeHive
                        </span>
                    </Link>

                    {/* Filter Bar - Only show when scrolled, perfectly centered */}
                    {isScrolled && (
                        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
                            <div className={`bg-white rounded-full shadow-lg border border-gray-200 p-1 transition-all duration-300 ${showCompactSearch ? 'w-96' : 'w-[32rem]'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 flex items-center space-x-2 px-3 py-1">
                                        <div className="flex-1 relative">
                                            <label className="block text-xs font-medium text-gray-700 mb-0.5">Price Range</label>
                                            <select
                                                value={filters.priceRange || ''}
                                                onChange={(e) => handleFilterChange({ name: 'priceRange', value: e.target.value })}
                                                className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent appearance-none cursor-pointer pr-8 py-1 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition: 'right 0.5rem center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '1.5em 1.5em'
                                                }}
                                            >
                                                <option value="" className="py-2 px-3 hover:bg-rose-50">Any Price</option>
                                                <option value="0-500" className="py-2 px-3 hover:bg-rose-50">Below ETB 500</option>
                                                <option value="500-5000" className="py-2 px-3 hover:bg-rose-50">ETB 500 - ETB 1,000</option>
                                                <option value="5000-10000" className="py-2 px-3 hover:bg-rose-50">ETB 5,000 - ETB 10,000</option>
                                                <option value="10000-100000" className="py-2 px-3 hover:bg-rose-50">ETB 10,000 - ETB 100,000</option>
                                                <option value="1000000-1000000000" className="py-2 px-3 hover:bg-rose-50">ETB 1,000,000+</option>
                                            </select>
                                        </div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="flex-1 relative">
                                            <label className="block text-xs font-medium text-gray-700 mb-0.5">Property Type</label>
                                            <select
                                                value={filters.type || ''}
                                                onChange={(e) => handleFilterChange({ name: 'type', value: e.target.value })}
                                                className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent appearance-none cursor-pointer pr-8 py-1 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition: 'right 0.5rem center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '1.5em 1.5em'
                                                }}
                                            >
                                                <option value="" className="py-2 px-3 hover:bg-rose-50">Any Type</option>
                                                <option value="Rent" className="py-2 px-3 hover:bg-rose-50">For Rent</option>
                                                <option value="Sell" className="py-2 px-3 hover:bg-rose-50">For Sale</option>
                                            </select>
                                        </div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="flex-1 relative">
                                            <label className="block text-xs font-medium text-gray-700 mb-0.5">Category</label>
                                            <select
                                                value={filters.category || ''}
                                                onChange={(e) => handleFilterChange({ name: 'category', value: e.target.value })}
                                                className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent appearance-none cursor-pointer pr-8 py-1 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition: 'right 0.5rem center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '1.5em 1.5em'
                                                }}
                                            >
                                                <option value="" className="py-2 px-3 hover:bg-rose-50">Any Category</option>
                                                <option value="Apartment" className="py-2 px-3 hover:bg-rose-50">Apartment</option>
                                                <option value="Villa" className="py-2 px-3 hover:bg-rose-50">Villa</option>
                                                <option value="Normal House" className="py-2 px-3 hover:bg-rose-50">House</option>
                                                <option value="Commercial" className="py-2 px-3 hover:bg-rose-50">Commercial</option>
                                                <option value="Condominium" className="py-2 px-3 hover:bg-rose-50">Condominium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleSearch}
                                        className="bg-rose-600 text-white p-1.5 rounded-full hover:bg-rose-700 transition-colors duration-200 flex items-center space-x-1"
                                    >
                                        <FaSearch className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link
                                    to="/create-listing"
                                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                                >
                                    Become a host
                                </Link>
                                
                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <FaBars className="text-gray-600" />
                                        <FaUserCircle className="text-gray-600 text-xl" />
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-2">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => onSearch(filters)}
                            className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <FaFilter className="text-gray-600" />
                            <span className="text-sm font-medium">Filters</span>
                        </button>
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            {menuOpen ? (
                                <FaTimes className="text-gray-600 text-xl" />
                            ) : (
                                <FaBars className="text-gray-600 text-xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-0 right-0 w-80 h-full bg-white shadow-2xl transform ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaTimes className="text-gray-600 text-xl" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 p-6">
                        <div className="space-y-4">
                            {user ? (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user.username}</p>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/"
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaHome className="text-gray-600" />
                                        <span className="font-medium text-gray-900">Home</span>
                                    </Link>
                                    <Link
                                        to="/create-listing"
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaPlus className="text-gray-600" />
                                        <span className="font-medium text-gray-900">Become a host</span>
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaUser className="text-gray-600" />
                                        <span className="font-medium text-gray-900">Profile</span>
                                    </Link>
                                    <div className="pt-4 border-t border-gray-100">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full"
                                        >
                                            <FaSignOutAlt className="text-red-600" />
                                            <span className="font-medium text-red-600">Logout</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaSignInAlt className="text-gray-600" />
                                        <span className="font-medium text-gray-900">Sign in</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex items-center space-x-3 p-3 rounded-lg bg-rose-600 text-white transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaUserPlus />
                                        <span className="font-medium">Sign up</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                © 2024 HomeHive. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
