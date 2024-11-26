import { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const [loading, setLoading] = useState(false); // Loading state
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
                    if (data.success) {
                        navigate('/orders');
                        setCartItems({});
                        showSuccessAlert();
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#F37254"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const applyCustomStyles = () => {
        const swalOverlay = document.querySelector(".swal-overlay");
        const swalPopup = document.querySelector(".swal-modal");
        const swalTitle = swalPopup.querySelector(".swal-title");
        const swalText = swalPopup.querySelector(".swal-text");
        const swalButton = swalPopup.querySelector(".swal-button");

        // Overlay background color
        swalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";

        // Modal styles for centering and appearance
        swalPopup.style.position = "fixed";
        swalPopup.style.top = "50%";
        swalPopup.style.left = "50%";
        swalPopup.style.transform = "translate(-50%, -50%)";
        swalPopup.style.borderRadius = "0";
        swalPopup.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
        swalPopup.style.padding = "20px";
        swalPopup.style.backgroundColor = "#000";
        swalPopup.style.color = "#fff";
        swalPopup.style.display = "flex";
        swalPopup.style.flexDirection = "column";
        swalPopup.style.alignItems = "center";
        swalPopup.style.textAlign = "center";

        // Title styling
        swalTitle.style.color = "#fff";
        swalTitle.style.fontWeight = "600";
        swalTitle.style.fontSize = "20px";

        // Text styling
        swalText.style.color = "#ddd";
        swalText.style.fontSize = "16px";
        swalText.style.marginTop = "10px";
        swalText.style.marginBottom = "20px";

        // Button styling
        swalButton.style.backgroundColor = "#fff";
        swalButton.style.color = "#000";
        swalButton.style.padding = "10px 20px";
        swalButton.style.fontSize = "14px";
        swalButton.style.borderRadius = "0";
        swalButton.style.marginTop = "20px";
        swalButton.style.transition = "background-color 0.3s ease";

        // Hover effect for button
        swalButton.addEventListener("mouseover", () => {
            swalButton.style.backgroundColor = "#ddd";
        });
        swalButton.addEventListener("mouseout", () => {
            swalButton.style.backgroundColor = "#fff";
        });
    };

    const showSuccessAlert = () => {
        swal({
            title: "✓ Thank you for your purchase!",
            text: "Your order has been placed successfully.",
            icon: null,
            button: {
                text: "OK",
                closeModal: true,
                className: "custom-swal-button"
            },
            className: "custom-swal-popup"
        });

        // Small delay before applying styles
        setTimeout(applyCustomStyles, 0);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true

        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
                    if (response.data.success) {
                        setCartItems({});
                        navigate('/orders');
                        showSuccessAlert();
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
                    if (responseRazorpay.data.success) {
                        initPay(response543.data.order);
                    } else {
                        toast.error(responseRazorpay.data.message);
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false); // Reset loading to false after processing
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
                <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                    <div className='text-xl sm:text-2xl my-3'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                    </div>
                    <div className='flex gap-3'>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                    </div>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                    <div className='flex gap-3'>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                        <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-3'>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                    </div>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
                </div>

                <div className='mt-8'>
                    <div className='mt-8 min-w-80'>
                        <CartTotal />
                    </div>

                    <div className='mt-12'>
                        <Title text1={'PAYMENT'} text2={'METHOD'} />
                        <div className='flex gap-3 flex-col lg:flex-row'>
                            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Logo" />
                            </div>
                            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                                <p>Cash on delivery</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm' disabled={loading}>
                            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PlaceOrder;