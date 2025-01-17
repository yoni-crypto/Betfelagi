import { useEffect, useState } from 'react';
import axios from 'axios';
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

    const fetchHouses = async () => {
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
    };

    // Reset filters to default values
    const resetFilters = () => {
        setFilters({
            priceRange: '',
            type: '',
            category: ''
        });
        setNoResults(false); 
        setCurrentPage(1); 
        fetchHouses(); 
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Fetch houses on page load and when the page or filters change
    useEffect(() => {
        if (filters.priceRange || filters.type || filters.category) {
            fetchFilteredHouses();
        } else {
            fetchHouses();
        }
    }, [currentPage, filters]);

    return (
        <div className=" mx-auto py-8">
            <header
    className="relative bg-blue-50 px-6 md:px-24 lg:px-48 py-16 md:py-20 lg:py-24 bg-cover bg-center"
    style={{ backgroundImage: 'url("./bg.jpg")', backgroundRepeat: 'no-repeat' }}
>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
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

        {/* Right Content */}
        <div className="hidden lg:block">
            <img
                src="./md.jpg"
                alt="Showcase"
                className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] rounded-xl shadow-lg"
            />
        </div>
    </div>

    {/* Search Filters */}
    <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[68%] bg-white rounded-lg shadow-lg p-4 md:p-6 w-[90%] max-w-4xl flex flex-wrap justify-center gap-4 items-center mb-4"
    >
        <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none"
        >
            <option value="">Price Range</option>
            <option value="0-500">Below $500</option>
            <option value="500-5000">$500 - $1,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000-100000">$10,000 - $100,000</option>
            <option value="1000000-1000000000">$1,000,000 - $100,000,000</option>
        </select>
        <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none"
        >
            <option value="">Property Type</option>
            <option value="Rent">For Rent</option>
            <option value="Sell">For Sale</option>
        </select>
        <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none"
        >
            <option value="">Category</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Normal House">Normal House</option>
            <option value="Commercial">Commercial</option>
            <option value="Condominium">Condominium</option>
        </select>
        <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
            Search
        </button>
        <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full sm:w-auto"
        >
            Reset Filters
        </button>
    </div>
</header>



            {/* <section className="container mx-auto mt-24 mb-12">
                <h2 className="text-2xl font-bold mb-6">Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
                    {['Houses', 'Apartments', 'Commercial', 'Daily rental', 'New buildings', 'More'].map((category) => (
                        <div
                            key={category}
                            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg cursor-pointer">
                            <span className="block text-gray-800 font-semibold">{category}</span>
                        </div>
                    ))}
                </div>
            </section> */}

            <section className='container mx-auto mt-12 px-4'> 
                <h2 className=" text-2xl font-bold mb-6">Top Offers</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {houses.map((house) => (
                        <HouseCard key={house._id} house={house} />
                    ))}
                </div>

                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
                    </div>
                )}

                {noResults && (
                    <div className="text-center text-red-500 font-semibold mt-4">
                        No available houses match your search criteria.
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300">
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-2 rounded-md ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                                }`}>
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300">
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
