import { useEffect, useState } from 'react';
import axios from 'axios';
import HouseCard from '../components/HouseCard'; // Adjust the import path as necessary
import { Dialog, DialogActions, DialogTitle, Button, Avatar, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { CloudUpload } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedHouseId, setSelectedHouseId] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null); // File for profile image upload

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get('https://betfelagi-api.vercel.app/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfile(data);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.delete(`https://betfelagi-api.vercel.app/api/houses/delete/${selectedHouseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(data.message);
            setUserProfile((prevState) => ({
                ...prevState,
                listings: prevState.listings.filter((house) => house._id !== selectedHouseId),
            }));
            setOpen(false);
        } catch (error) {
            console.error('Error deleting house:', error);
            toast.error('Failed to delete the house.');
        }
    };

    const handleOpenDialog = (houseId) => {
        setSelectedHouseId(houseId);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedHouseId(null);
    };

    const handleProfileImageChange = (e) => {
        setProfileImageFile(e.target.files[0]); // Get selected file
    };

    const handleProfileImageUpload = async () => {
        if (!profileImageFile) {
            toast.error('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', profileImageFile);

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('https://betfelagi-api.vercel.app/api/users/upload-profile-image', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(data.message);
            setUserProfile((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    profileImage: data.profileImage, // Update profile image URL
                },
            }));
        } catch (error) {
            console.error('Failed to upload profile image:', error);
            toast.error('Failed to upload profile image.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!userProfile) return <p>No user profile found</p>;

    return (
        <div className="container mt-12 mx-auto py-8">
            <ToastContainer position="top-center" autoClose={3000} />
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">User Profile</h1>

            <div className="bg-white shadow-md rounded-md p-4 mb-6 text-center">
                <Avatar
                    src={userProfile.user.profileImage || '/default-profile-icon.png'} // Show default icon if no profile image
                    alt={userProfile.user.username}
                    sx={{ width: 100, height: 100, margin: '0 auto 10px' }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    style={{ display: 'none' }}
                    id="profile-image-upload"
                />
                <label htmlFor="profile-image-upload">
                    <IconButton component="span" color="primary">
                        <CloudUpload />
                    </IconButton>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleProfileImageUpload}
                    disabled={!profileImageFile}
                >
                    {userProfile.user.profileImage ? 'Update Profile Image' : 'Add Profile Image'}
                </Button>

                <h2 className="text-xl font-semibold mt-4">Profile Information</h2>
                <p><strong>Username:</strong> {userProfile.user.username}</p>
                <p><strong>Email:</strong> {userProfile.user.email}</p>
                <p><strong>Phone Number:</strong> {userProfile.user.phoneNumber}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4 p-2">Your Listings</h2>
            <div className="grid grid-cols-2 p-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {userProfile.listings.length > 0 ? (
                    userProfile.listings.map(house => (
                        <HouseCard
                            key={house._id}
                            house={house}
                            isOwner={house.user === userProfile.user._id} // Check ownership
                            onDelete={() => handleOpenDialog(house._id)} // Open dialog
                        />
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Are you sure you want to delete this listing?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserProfile;
