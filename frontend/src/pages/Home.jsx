import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import HouseCard from '../components/HouseCard';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS } from '../config/api';

const Home = () => {
    const [houses, setHouses] = useState([]);
    const [filters, setFilters] = useState({
        priceRange: '',
        type: '',
        category: '',
        location: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    });
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showCompactSearch, setShowCompactSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
            setShowCompactSearch(scrollTop > 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchHouses = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(API_ENDPOINTS.GET_HOUSES, {
                params: { page: currentPage, limit: 50 },
            });
            
            setHouses(data.houses);
            setTotalPages(data.totalPages);
            setNoResults(false);
        } catch (err) {
            console.error('Error fetching houses:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilteredHouses = async () => {
        setLoading(true);
        setNoResults(false);
        try {
            const { data } = await axios.get(API_ENDPOINTS.FILTER_HOUSES, {
                params: { page: currentPage, limit: 50, ...filters },
            });
            
            if (data.houses.length === 0) {
                setNoResults(true);
            }

            setHouses(data.houses);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Error fetching filtered houses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = ({ name, value }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearch = (combinedFilters) => {
        setFilters(combinedFilters);
        setCurrentPage(1);
        fetchFilteredHouses();
        const activeCount = Object.values(combinedFilters).filter(value => value !== '').length;
        setActiveFilters(activeCount);
    };

    const resetFilters = () => {
        setFilters({
            priceRange: '',
            type: '',
            category: '',
            location: '',
            checkIn: '',
            checkOut: '',
            guests: ''
        });
        setNoResults(false);
        setCurrentPage(1);
        setActiveFilters(0);
        fetchHouses();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (filters.priceRange || filters.type || filters.category || filters.location || filters.checkIn || filters.checkOut || filters.guests) {
            fetchFilteredHouses();
        } else {
            fetchHouses();
        }
    }, [currentPage, filters]);

    return (
        <div className="min-h-screen bg-white font-['Inter']">
            <Navbar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                isScrolled={isScrolled}
                showCompactSearch={showCompactSearch}
            />

            {!isScrolled && (
                <div className="bg-white">
                    <div className="container mx-auto px-4 py-4 sm:py-8">
                        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-1 sm:p-2 max-w-4xl mx-auto mb-4 sm:mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex items-center space-x-2 sm:space-x-4 px-3 sm:px-6 py-2 sm:py-3">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-700 mb-0.5 sm:mb-1">Price Range</label>
                                        <select
                                            value={filters.priceRange || ''}
                                            onChange={(e) => handleFilterChange({ name: 'priceRange', value: e.target.value })}
                                            className="w-full text-sm sm:text-lg font-medium text-gray-900 focus:outline-none bg-transparent"
                                        >
                                            <option value="">Any Price</option>
                                            <option value="0-500">Below ETB 500</option>
                                            <option value="500-5000">ETB 500 - ETB 1,000</option>
                                            <option value="5000-10000">ETB 5,000 - ETB 10,000</option>
                                            <option value="10000-100000">ETB 10,000 - ETB 100,000</option>
                                            <option value="1000000-1000000000">ETB 1,000,000+</option>
                                        </select>
                                    </div>
                                    <div className="w-px h-6 sm:h-8 bg-gray-300"></div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-700 mb-0.5 sm:mb-1">Property Type</label>
                                        <select
                                            value={filters.type || ''}
                                            onChange={(e) => handleFilterChange({ name: 'type', value: e.target.value })}
                                            className="w-full text-sm sm:text-lg font-medium text-gray-900 focus:outline-none bg-transparent"
                                        >
                                            <option value="">Any Type</option>
                                            <option value="Rent">For Rent</option>
                                            <option value="Sell">For Sale</option>
                                        </select>
                                    </div>
                                    <div className="w-px h-6 sm:h-8 bg-gray-300"></div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-700 mb-0.5 sm:mb-1">Category</label>
                                        <select
                                            value={filters.category || ''}
                                            onChange={(e) => handleFilterChange({ name: 'category', value: e.target.value })}
                                            className="w-full text-sm sm:text-lg font-medium text-gray-900 focus:outline-none bg-transparent"
                                        >
                                            <option value="">Any Category</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Normal House">House</option>
                                            <option value="Commercial">Commercial</option>
                                            <option value="Condominium">Condominium</option>
                                        </select>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleSearch(filters)}
                                    className="bg-rose-600 text-white p-2 sm:p-4 rounded-full hover:bg-rose-700 transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
                                >
                                    <FaSearch className="text-sm sm:text-lg" />
                                    <span className="font-medium text-sm sm:text-base">Search</span>
                                </button>
                            </div>
                        </div>

                        {activeFilters > 0 && (
                            <div className="flex items-center justify-center">
                                <button 
                                    onClick={resetFilters}
                                    className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <section className="container mx-auto px-4 py-8">
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin h-8 w-8 border-4 border-rose-600 border-t-transparent rounded-full"></div>
                            <span className="text-gray-600 font-medium">Loading properties...</span>
                        </div>
                    </div>
                )}

                {noResults && (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaSearch className="text-gray-400 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search criteria to find more properties.</p>
                            <button 
                                onClick={resetFilters}
                                className="bg-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors duration-200"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !noResults && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Popular homes in your area</h2>
                            <button className="text-gray-600 hover:text-gray-900 font-medium">
                                Show all
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
                            {houses.map((house) => (
                                <HouseCard key={house._id} house={house} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 py-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <FaChevronLeft className="mr-2" />
                                    Previous
                                </button>

                                <div className="flex space-x-1">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                                currentPage === index + 1
                                                    ? 'bg-rose-600 text-white'
                                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Next
                                    <FaChevronRight className="ml-2" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default Home;
