import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Real Estate Platform</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                        <li><Link to="/listings" className="text-gray-700 hover:text-blue-600">Listings</Link></li>
                        <li><Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
