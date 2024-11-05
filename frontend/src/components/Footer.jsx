import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="PantsnPleats Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            At PantsnPleats, we specialize in providing high-quality, stylish pants for every occasion. Our collection combines comfort and your aesthetic, ensuring you look and feel your best. Explore our range and elevate your wardrobe with us today.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>91 621 555 0132</li>
            <li>support@pantsnpleats.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-700 opacity-88'>&copy; PantsnPleats. All Rights Reserved.</p>
        <p className='py-2 text-sm text-center text-gray-500 opacity-88'>Developed By Rahul</p>

        
      </div>
    </div>
  );
};

export default Footer;
