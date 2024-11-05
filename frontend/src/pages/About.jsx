import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px] shadow-lg grayscale' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Pants & Pleats was created with a passion for style and a commitment to elevate the shopping experience for fashion enthusiasts. Our journey began with a simple vision: to build a platform where customers can easily find and shop a curated selection of premium pants that blend comfort, quality, and timeless style.</p>
              <p>From our inception, we have focused on sourcing a range of pants that cater to diverse tastes and occasions. Whether you’re seeking classic office wear, casual essentials, or trendy pieces, Pants & Pleats offers collections that reflect quality and sophistication, brought to you by trusted brands and suppliers.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>At Pants & Pleats, our mission is to empower customers with style, convenience, and confidence. We’re committed to delivering an effortless shopping experience that exceeds expectations—from the moment you browse our collections to the delivery of your chosen styles.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
