import React from 'react';
import Swal from 'sweetalert2';

const NewsletterBox = () => {
    // Function to show the success alert
    const showSuccessAlert = () => {
        Swal.fire({
            title: "Thank you for subscribing!",
            text: "You are subscribed to our newsletter. Use coupon code: PNP20 for a 20% discount!",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
                popup: 'bg-black text-white p-6 shadow-lg text-center rounded-none', // Remove border radius
                title: 'text-lg font-semibold', // Professional text style
                htmlContainer: 'text-gray-300 text-sm', // More subtle, professional text color and size
                confirmButton: 'bg-white text-black px-6 py-2 rounded-none hover:bg-gray-200 transition duration-200' // Button without border radius
            },
            backdrop: 'rgba(0, 0, 0, 0.7)', // Dark overlay
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    };

    // Function to handle form submission
    const onSubmitHandler = (event) => {
        event.preventDefault();
        showSuccessAlert();
    };

    return (
        <div className='text-center'>
            <NewsletterHeader />
            <NewsletterForm onSubmit={onSubmitHandler} />
        </div>
    );
};

// Component for the header
const NewsletterHeader = () => (
    <>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Be the first to access deals and new arrivals—join us today!
        </p>
    </>
);

// Component for the newsletter subscription form
const NewsletterForm = ({ onSubmit }) => (
    <form onSubmit={onSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
            className='w-full sm:flex-1 outline-none'
            type="email"
            placeholder='Enter your email'
            required
            autoComplete="email" // Enables browser's email autofill
        />
        <button
            type='submit'
            className='bg-black text-white text-xs px-10 py-4'
        >
            SUBSCRIBE
        </button>
    </form>
);

export default NewsletterBox;
