import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const CreateListing = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('Apartment'); 
    const [type, setType] = useState('Rent'); 
    const [images, setImages] = useState([]); 
    const navigate = useNavigate();

    const handleAddHouse = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('type', type);
        
        images.forEach(image => {
            formData.append('images', image);
        });

        try {
            await axios.post('https://betfelagi-api.vercel.app/api/houses/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Listing added successfully!');
            resetFields();
            setTimeout(() => navigate('/profile'), 2000);
        } catch (err) {
            console.error(err);
            toast.error('Failed to add listing. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        // Convert the FileList to an array and add new files to existing ones, but only allow up to 5 images
        const newImages = Array.from(e.target.files);
        if (images.length + newImages.length <= 5) {
            setImages(prevImages => [...prevImages, ...newImages]);
        } else {
            alert('You can only upload up to 5 images.');
        }
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const resetFields = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setCategory('Apartment'); 
        setType('Rent'); 
        setImages([]); 
    };

    return (
        <div className="container mx-auto py-8 max-w-lg">
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="text-xl font-bold text-center mb-6">Add a New Listing</h2>
            <form onSubmit={handleAddHouse} className="bg-white shadow-md rounded-md p-6">
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Price ($/month)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Normal House">Normal House</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Condominium">Condominuim</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">For</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    >
                        <option value="Rent">Rent</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Images</label>
                    {images.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {images.length < 5 && (
                                <label htmlFor="image-upload" className="flex justify-center items-center w-24 h-24 bg-gray-200 rounded-md cursor-pointer">
                                    <span className="text-2xl text-gray-600">+</span>
                                </label>
                            )}
                        </div>
                    ) : (
                        <label htmlFor="image-upload" className="flex justify-center items-center w-24 h-24 bg-gray-200 rounded-md cursor-pointer">
                            <span className="text-2xl text-gray-600">+</span>
                        </label>
                    )}
                    <input
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        multiple
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                    Add Listing
                </button>
            </form>
        </div>
    );
};

export default CreateListing;
