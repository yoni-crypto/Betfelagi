import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import HouseDetails from './pages/HouseDetails';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import EditHouse from './components/EditHouse';
import Profile from './pages/Profile';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/edit-house/:id" element={<ProtectedRoute><EditHouse /></ProtectedRoute>} />
                            <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
                            <Route path="/houses/:id" element={<HouseDetails />} />
                            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
                            <Route path="/userprofile/:userId" element={<Profile />}/>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
