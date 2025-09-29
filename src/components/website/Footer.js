import React from 'react';
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaSlack } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

// Import your logo
// import logo from '../../../assets/images/logo.png';
import logo from '../../assets/images/website/footerLogo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '#' },
  ];

  const quickLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Legal', href: '#' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={18} />, href: '#', label: 'Facebook' },
    { icon: <FaTelegramPlane size={18} />, href: '#', label: 'Telegram' },
    { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <FaSlack size={18} />, href: '#', label: 'Slack' },
  ];

  return (
    <footer className="bg-primary text-white space-top ">
      <div className="container mx-auto py-8 lg:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info Section */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-full ">
                <img src={logo} alt="" />
              </div>
            </div>

            {/* Company Description */}
            <p className="text-sm text-white/90 leading-relaxed">
              High level experience in web design and development knowledge, producing quality work.
            </p>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold mb-3 text-base">Follow us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 h-9 bg-white/20 hover:bg-[#164250] rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 w-full" >
              <div className="mt-1 flex-shrink-0">
                <MdLocationOn size={20} />
              </div>
              <div>
                <p className="text-sm text-white/90 leading-relaxed">
                  A-64 Sector 63, Noida,<br />
                  Uttar Pradesh, 201301,
                  India
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MdEmail size={20} />
              <a
                href="mailto:rjvijs42@gmail.com"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                rjvijs42@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <MdPhone size={20} />
              <a
                href="tel:+915252525252"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                +91 5252525252
              </a>
            </div>
          </div>

          {/* Company Links Section */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Quick Link</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#164250]">
        <div className="container mx-auto py-4">
          <p className="text-center text-sm text-white/90 font-semibold">
            ©{currentYear} ZENDRIVESAFE All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
