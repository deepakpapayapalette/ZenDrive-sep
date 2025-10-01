import React, { useState } from 'react'
import image from "../../assets/images/website/shop/banner.png"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"; import { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import Banner from '../../UI/Banner';
import { IoMdSend } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import FAQSection from '../../components/website/contact/FAQSection';
import { useFormik } from 'formik'
import * as Yup from 'yup';
const ContactUs = () => {
  const bannerContent = {
    image: image,
    title: "Contact Us",
    description: "We’d love to hear from you! Whether you want to collaborate, contribute, or simply learn more, feel free to reach out."
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

  const socialLinks = [
    { icon: <FaLinkedinIn size={18} />, href: '#', label: 'Linkedin' },
    { icon: <FaFacebookF size={18} />, href: '#', label: 'Facbook' },
    { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <FaTwitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <FaYoutube size={18} />, href: '#', label: 'Youtube' },
  ];
  const userSchema = Yup.object({
    username: Yup.string().min(3).max(30).required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.number().min(10).max(10).required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });



  const initialValues = {
    username: '',
    email: '',
    phone: '',
    message: '',
  };

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    validationSchema: userSchema,
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values)
    }
  })

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
                <div className="flex space-x-5 text-gray-600 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-9 h-9 bg-gray-400 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <span className='text-white'>
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section (Form) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-800 mb-2">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-6">We’d love to hear you</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  name="username"
                  type="text"
                  placeholder="Full Name"
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none ${errors.username && touched.username ? 'border-red-500' : ''}`}
                /> <br />
                {errors.username && touched.username ?
                  <p className="text-red-600 text-xs">{errors.username}</p>
                  : null
                }
                <input
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  type="email"
                  placeholder="Email Address"
                  onBlur={handleBlur}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none   ${errors.email && touched.email ? 'border-red-500' : ''}`}
                /> <br />
                {errors.email && touched.email ?
                  <p className="text-red-600 text-xs">{errors.email}</p>
                  : null
                }
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  name='phone'
                  type="text"
                  placeholder="Phone No"
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none ${errors.phone && touched.phone ? 'border-red-500' : ''}`}
                /><br />
                {errors.phone && touched.phone ?
                  <p className="text-red-600 text-xs">{errors.phone}</p>
                  : null
                }
                <textarea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  name='message'
                  placeholder="Message"
                  rows="4"
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none  ${errors.message && touched.message ? 'border-red-500' : ''}`}
                ></textarea><br />
                {errors.message && touched.message ?
                  <p className="text-red-600 text-xs">{errors.message}</p>
                  : null
                }
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
