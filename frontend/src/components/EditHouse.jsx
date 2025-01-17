import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditHouse = () => {
    const { id } = useParams(); // Get the house ID from the URL
    const navigate = useNavigate(); // Used to navigate after form submission
    const [house, setHouse] = useState(null); // Store house data
    const [loading, setLoading] = useState(true); // Loading state for the house data
    const [error, setError] = useState(''); // Error state if the request fails
    const [images, setImages] = useState([]); // To store new images selected by user
    const [existingImages, setExistingImages] = useState([]); // To store existing images from the house
    const [imagesToDelete, setImagesToDelete] = useState([]); // Track images to delete

    useEffect(() => {
        // Fetch house data when component is mounted
        const fetchHouse = async () => {
            try {
                const { data } = await axios.get(`https://betfelagi-api.vercel.app/api/houses/${id}`);
                setHouse(data); // Set house data from API response
                setExistingImages(data.images || []); // Set existing images for the house
            } catch (err) {
                console.error('Failed to fetch house data', err);
                setError('Failed to load house data.');
            } finally {
                setLoading(false); // Stop loading when data is fetched
            }
        };

        fetchHouse();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const formData = new FormData(event.target); // Collect form data
    
        // Append existing images to the FormData
        existingImages.forEach((image) => {
            formData.append('existingImages', image); // Send existing images to backend
        });
    
        // Append the new images if any
        images.forEach((image) => {
            formData.append('images', image);
        });
    
        // Send the images to be deleted
        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

        const token = localStorage.getItem('token');
        try {
            const { data } = await axios.put(`https://betfelagi-api.vercel.app/api/houses/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            toast.success("Updated Sucessfully"); // Show success message
            navigate(`/houses/${id}`); // Redirect to house details page after successful update
        } catch (err) {
            toast.error('Failed to update house.'); // Show error message
            console.error('Failed to update house', err);
            setError('Failed to update house.');
        }
    };

    // Handle image changes (add new images)
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    // Handle image removal
    const handleRemoveImage = (index, isExistingImage = false) => {
        if (isExistingImage) {
            // Remove existing image logic
            const updatedExistingImages = existingImages.filter((_, i) => i !== index);
            setExistingImages(updatedExistingImages);

            // Add the image to the imagesToDelete list to track which images should be deleted
            setImagesToDelete([...imagesToDelete, existingImages[index]]);
        } else {
            // Remove newly added image logic
            const updatedImages = images.filter((_, i) => i !== index);
            setImages(updatedImages);
        }
    };

    if (loading) return <p>Loading...</p>; // Loading state
    if (error) return <p>{error}</p>; // Error state

    return (
        <div className="container mx-auto py-8">
            <ToastContainer position="top-center" autoClose={3000} />
            <h1 className="text-2xl font-bold text-center mb-6">Edit House</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 space-y-4">
                {/* Title */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="font-medium">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={house.title}
                        required
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-medium">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={house.description}
                        required
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-medium">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        defaultValue={house.price}
                        required
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label htmlFor="location" className="font-medium">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        defaultValue={house.location}
                        required
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="font-medium">Category:</label>
                    <select
                        id="category"
                        name="category"
                        defaultValue={house.category}
                        required
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Normal House">Normal House</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Condominium">Condominuim</option>
                    </select>
                </div>

                {/* Type */}
                <div className="flex flex-col">
                    <label htmlFor="type" className="font-medium">Type:</label>
                    <select
                        id="type"
                        name="type"
                        defaultValue={house.type}
                        required
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="Sell">Sell</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>

                {/* Images Section */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Images</label>
                    {existingImages.length > 0 || images.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {/* Render existing images */}
                            {existingImages.map((image, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={`http://localhost:5000/${image}`}
                                        alt={`existing-image-${index}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index, true)} // Remove existing image
                                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {/* Render new images */}
                            {images.map((image, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)} // Remove new image
                                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {/* Add new image button */}
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

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Update House
                </button>
            </form>
        </div>
    );
};

export default EditHouse;
