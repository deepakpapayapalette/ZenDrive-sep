import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

const LifeSaverShare = ({ itemId, onClose }) => {
  const [link] = useState(
    `https://www.com/design/2tSvFoUIne68cD62ARrIME/Road-Safety${itemId ? `?id=${itemId}` : ''}`
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: <FaLinkedinIn size={18} />, href: '#', label: 'Linkedin' },
    { icon: <FaFacebookF size={18} />, href: '#', label: 'Facbook' },
    { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
  ];
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <FiX size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-primary mb-2">
          I’m a Life Saver — Join Me!
        </h2>
        <p className="text-gray-600 mb-4">
          Proudly share your organ donation pledge and inspire others to give the
          gift of life. Every pledge brings hope and saves lives.
        </p>

        {/* Link Copy Section */}
        <div className="flex items-center border rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            readOnly
            value={link}
            className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-primary text-white px-4 py-2 flex items-center gap-2 hover:bg-teal-700"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 text-gray-600">
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
  );
};

export default LifeSaverShare;
