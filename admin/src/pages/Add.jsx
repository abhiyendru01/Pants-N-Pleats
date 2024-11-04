import { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([null, null, null, null]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const handleImageChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setImages([null, null, null, null]);
        setPrice('');
        setSizes([]);
        setBestseller(false);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            images.forEach((image, index) => {
                if (image) formData.append(`image${index + 1}`, image);
            });

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                resetForm();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    {images.map((image, index) => (
                        <label key={index} htmlFor={`image${index + 1}`}>
                            <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                            <input onChange={(e) => handleImageChange(index, e.target.files[0])} type="file" id={`image${index + 1}`} hidden />
                        </label>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
                </div>
            </div>
            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                            <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>
            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white' disabled={loading}>
                {loading ? 'Adding...' : 'ADD'}
            </button>
        </form>
    );
}

export default Add;
