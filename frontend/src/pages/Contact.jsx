import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center text-3xl font-bold pt-10 border-t border-black">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Information Section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px] shadow-lg grayscale" src={assets.contact_img} alt="Contact" />
        <div className="flex flex-col justify-center items-start gap-6 md:max-w-[500px]">
          <p className="font-semibold text-2xl text-black">Our Store</p>
          <p className="text-gray-700">54709 JALANDHAR <br /> PUNJAB,144001</p>
          <p className="text-gray-700">Tel: (415) 555-0132 <br /> Email: <a href="mailto:support@pantsnpleats.com" className="text-black hover:underline">support@pantsnpleats.com</a></p>
          <p className="font-semibold text-2xl text-black">Careers at PantsnPleats</p>
          <p className="text-gray-700">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-3 text-sm font-semibold text-black hover:bg-black hover:text-white transition-all duration-500">
            Explore More
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="my-10 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-black">Get in Touch</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="border border-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button type="submit" className= "bg-black text-white text-xs px-10 py-4 hover:bg-white-700 transition-all duration-300">
            SEND MESSAGE
          </button>
        </form>
      </div>


      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
}

export default Contact;
