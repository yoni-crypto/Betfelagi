import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for pagination
import { BiFilter } from 'react-icons/bi'; // Filter icon for mobile
import HouseCard from '../components/HouseCard';

const Home = () => {
    const [houses, setHouses] = useState([]);
    const [filters, setFilters] = useState({
        priceRange: '',
        type: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterModalOpen, setFilterModalOpen] = useState(false); // Mobile filter modal state

    const fetchHouses = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('https://betfelagi-api.vercel.app/api/houses/get', {
                params: { page: currentPage, ...filters },
            });
            setHouses(data.houses);
            setTotalPages(data.totalPages);
            setNoResults(false);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchFilteredHouses = async () => {
        setLoading(true);
        setNoResults(false);
        try {
            const { data } = await axios.get('https://betfelagi-api.vercel.app/api/houses/filter', {
                params: { page: currentPage, ...filters },
            });

            if (data.houses.length === 0) {
                setNoResults(true);
            }

            setHouses(data.houses);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchFilteredHouses();
        setFilterModalOpen(false); // Close modal after search
    };

    const resetFilters = () => {
        setFilters({
            priceRange: '',
            type: '',
            category: ''
        });
        setNoResults(false);
        setCurrentPage(1);
        fetchHouses();
        setFilterModalOpen(false); // Close modal after reset
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (filters.priceRange || filters.type || filters.category) {
            fetchFilteredHouses();
        } else {
            fetchHouses();
        }
    }, [currentPage, filters]);

    return (
        <div className="mx-auto ">
            <header
                className="relative bg-blue-50 px-6 md:px-24 lg:px-48 py-16 md:py-20 lg:py-24 bg-cover bg-center"
                style={{ backgroundImage: 'url("./bg2.jpg")', backgroundRepeat: 'no-repeat' }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            Find A House That Suits You
                        </p>
                        <p className="text-sm md:text-sm lg:text-lg text-white">
                            Want to find a home? We are ready to help you find one that suits your lifestyle and needs.
                        </p>
                        <div className="flex flex-wrap gap-8 items-center">
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">1200+</h3>
                                <p className="text-sm md:text-lg text-white">Listed Properties</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">4500+</h3>
                                <p className="text-sm md:text-lg text-white">Happy Customers</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">100+</h3>
                                <p className="text-sm md:text-lg text-white">Awards</p>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:bg-blue-700">
                            Get Started
                        </button>
                    </div>

                    <div className="hidden lg:block">
                        <img
                            src="./md.jpg"
                            alt="Showcase"
                            className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] rounded-xl shadow-lg"
                        />
                    </div>
                </div>

                {/* Search Filters - Desktop */}
                <div className="hidden lg:flex absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[68%] bg-white rounded-lg shadow-lg p-4 md:p-6 w-[90%] max-w-4xl flex-wrap justify-center gap-4 items-center mb-4">
                    {/* Filters */}
                    <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-4 py-2">
                        <option value="">Price Range</option>
                        <option value="0-500">Below $500</option>
                        <option value="500-5000">$500 - $1,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000-100000">$10,000 - $100,000</option>
                        <option value="1000000-1000000000">$1,000,000 - $100,000,000</option>
                    </select>
                    <select name="type" value={filters.type} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-4 py-2">
                        <option value="">Property Type</option>
                        <option value="Rent">For Rent</option>
                        <option value="Sell">For Sale</option>
                    </select>
                    <select name="category" value={filters.category} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-4 py-2">
                        <option value="">Category</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Normal House">Normal House</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Condominium">Condominium</option>
                    </select>
                    <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Search
                    </button>
                    <button onClick={resetFilters} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                        Reset
                    </button>
                </div>
            </header>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-end px-6 py-4">
                <button onClick={() => setFilterModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <BiFilter className="text-lg" /> Filter
                </button>
            </div>
            

            {/* Mobile Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-4/5">
                        <h3 className="text-lg font-bold mb-4">Filters</h3>
                        <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4">
                            <option value="">Price Range</option>
                            <option value="0-500">Below $500</option>
                            <option value="500-5000">$500 - $1,000</option>
                            <option value="5000-10000">$5,000 - $10,000</option>
                            <option value="10000-100000">$10,000 - $100,000</option>
                            <option value="1000000-1000000000">$1,000,000 - $100,000,000</option>
                        </select>
                        <select name="type" value={filters.type} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4">
                            <option value="">Property Type</option>
                            <option value="Rent">For Rent</option>
                            <option value="Sell">For Sale</option>
                        </select>
                        <select name="category" value={filters.category} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4">
                            <option value="">Category</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Normal House">Normal House</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Condominium">Condominium</option>
                        </select>
                        <div className="flex justify-between">
                            <button onClick={resetFilters} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                                Reset
                            </button>
                            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Section */}
            <section className="container mx-auto mt-2 sm:mt-12 lg:mt-32 px-4">
                <h2 className="text-2xl font-bold mb-6">Top Offers</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {houses.map((house) => (
                        <HouseCard key={house._id} house={house} />
                    ))}
                </div>

                {loading && (
                <div className="flex justify-center items-center">
                    <div className=" animate-spin h-6 w-6 border-t-2 border-blue-500 rounded-full mr-2"></div>
                    <span>Loading...</span>
                </div>
            )}

                {noResults && (
                    <div className="text-center text-red-500 font-semibold mt-4">
                        No available houses match your search criteria.
                    </div>
                )}

                <div className="flex justify-center mt-8 items-center flex-wrap gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    >
                        <FaChevronLeft className="mr-2" />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    >
                        <FaChevronRight className="ml-2" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
