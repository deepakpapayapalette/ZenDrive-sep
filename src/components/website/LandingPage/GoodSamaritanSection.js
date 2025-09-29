import React from 'react';
import image from '../../../assets/images/website/SaveLives.png'
import { Shield } from "lucide-react";
import { MdOutlineNotificationsActive } from "react-icons/md";
export default function GoodSamaritanSection() {
  return (
    <section className='space-top'>
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-2">
            Be a Good Samaritan – Save Lives!
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Don't just watch a road accident happen – stop, help, and make a difference. Your timely support can save the life of a victim.
          </p>
        </div>
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold  mb-4">
              Why your timely help matters:
            </h2>

            <div className="space-y-4 mb-8 lg:mb-12">
              <div className="bg-[#eaf0f2] rounded-lg p-4 sm:p-5">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-base sm:text-xl text-gray-900 font-medium">
                    Immediate first aid can prevent fatalities.
                  </p>
                </div>
              </div>

              <div className="bg-[#eaf0f2] rounded-lg p-4 sm:p-5">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-base sm:text-xl text-gray-900 font-medium">
                    Quick reporting ensures faster medical care.
                  </p>
                </div>
              </div>

              <div className="bg-[#eaf0f2] rounded-lg p-4 sm:p-5">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-base sm:text-xl text-gray-900 font-medium">
                    Encourages a safer, compassionate community.
                  </p>
                </div>
              </div>
            </div>

            {/* Superhero Section */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 SUPERHERO-card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 border-0 border-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[var(--them-bg2)]">
                  {/* <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div> */}
                  <Shield />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    You could be a <span className="text-[var(--primary)]">SUPERHERO</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    The Government of India recognizes Good Samaritans and provides protection and rewards under the Good Samaritan Guidelines.
                  </p>
                </div>
              </div>


              {/* <div className="h-1 bg-[var(--primary)] rounded-full mt-6"></div> */}
            </div>
          </div>
          {/* Right Column - Image with Overlay */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              {/* Placeholder image with gradient overlay */}
              <div className="relative">
                <img src={image} alt="" className='w-full h-auto' />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm border-t border-gray-700 p-4 sm:p-6">
                <div className="flex items-start space-x-3 text-white items-center">
                  <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MdOutlineNotificationsActive size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base leading-tight">
                      Remember : Every minute counts. Don't wait – act and save a life today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
