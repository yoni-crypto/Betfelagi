import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import HouseDetails from './pages/HouseDetails';
import Chat from './pages/Chat';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import UserProfile from './pages/UserProfile';
import EditHouse from './components/EditHouse';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/edit-house/:id" element={<ProtectedRoute><EditHouse /></ProtectedRoute>} />
                            <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
                            <Route path="/houses/:id" element={<HouseDetails />} />
                            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
