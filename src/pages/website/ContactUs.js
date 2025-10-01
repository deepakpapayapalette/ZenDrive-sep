import React, { useState } from 'react'
import image from "../../assets/images/website/shop/banner.png"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"; import { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import Banner from '../../UI/Banner';
import { IoMdSend } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import FAQSection from '../../components/website/contact/FAQSection';

const ContactUs = () => {
  const bannerContent = {
    image: image,
    title: "Shop",
    description: " Discover safety gear, awareness kits, and smart tools that support our mission — every purchase helps make roads safer."
  }

  // const faqs = [
  //   {
  //     question: "How do I register as a driver on the portal?",
  //     answer: "To register as a driver, click on the 'Sign Up' button on the homepage, fill in your personal details, upload required documents (driver's license, vehicle registration, insurance), and complete the verification process. Once approved, you'll receive a confirmation email and can start using the portal."
  //   },
  //   {
  //     question: "Is my data and information secure?",
  //     answer: "Yes, we take data security very seriously. All your personal information and driving data is encrypted using industry-standard SSL/TLS protocols. We comply with data protection regulations and never share your information with third parties without your explicit consent. Our systems undergo regular security audits to ensure maximum protection."
  //   },
  //   {
  //     question: "Can I manage my appointments through the portal?",
  //     answer: "Absolutely! The portal allows you to schedule, reschedule, and cancel appointments for vehicle maintenance, fitness checks, and training sessions. You'll receive reminders via email and SMS, and can view your complete appointment history in your dashboard."
  //   },
  //   {
  //     question: "Can I access the portal on my mobile phone?",
  //     answer: "Yes, our portal is fully responsive and optimized for mobile devices. You can access all features through your mobile browser, or download our dedicated mobile app available for both iOS and Android devices for an even better experience on the go."
  //   },
  //   {
  //     question: "How can I collaborate with other drivers or specialists?",
  //     answer: "The portal features a community section where you can connect with other drivers, share experiences, and learn best practices. You can also request consultations with road safety specialists, join discussion forums, and participate in group training sessions. Fleet managers can coordinate with their entire team through our collaboration tools."
  //   }
  // ];



  return (
    <>
      <Banner bannerContent={bannerContent} />

      <section className="space-top bg-white ">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-800 mb-4">
                Let’s Talk
              </h2>
              <p className="text-gray-600 mb-6">
                Empowering hospitals, physicians, and patients with real-time
                communication and clinical collaboration—because better care starts
                with better connection.
              </p>

              {/* Contact Info */}
              <div className="bg-gray-100 rounded-lg p-5 space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiPhone className="text-lg" />
                  <span>+91 5252525252</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiMail className="text-lg" />
                  <span>rjvijs42@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiMapPin className="text-lg" />
                  <span>
                    H-Block, Sector-63, Noida, Uttar Pradesh, 201301, India
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-100 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                <div className="flex space-x-5 text-gray-600">
                  <a href="#"><FaLinkedinIn className="hover:text-teal-600" /></a>
                  <a href="#"><FaInstagram className="hover:text-teal-600" /></a>
                  <a href="#"><FaFacebookF className="hover:text-teal-600" /></a>
                  <a href="#"><FaTwitter className="hover:text-teal-600" /></a>
                  <a href="#"><FaYoutube className="hover:text-teal-600" /></a>
                </div>
              </div>
            </div>

            {/* Right Section (Form) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-800 mb-2">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-6">We’d love to hear you</p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Phone No"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                ></textarea>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-[var(--primary2)] transition"
                >
                  <span>Send Now</span>
                  <IoMdSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />


    </>
  )
}

export default ContactUs
