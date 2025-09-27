import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ThemeColors } from '../ThemeColors';
import { FiCalendar, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import TextInput from '../components/admin/InputFields/InputFields';
const challanRecords = [
  {
    challanType: "Traffic Rule Brake",
    date: "25/12/2025",
    time: "02:20 AM",
    location: "Ghaziabad",
    driverName: "Rohit Kumar",
    section: "Section 36 Act Of 1988",
    amount: 20120.00,
    status: "Paid"
  },
  {
    challanType: "Over Speeding",
    date: "18/11/2025",
    time: "11:45 PM",
    location: "Delhi",
    driverName: "Amit Singh",
    section: "Section 183 Act Of 1988",
    amount: 15500.00,
    status: "Paid"
  },
  {
    challanType: "Signal Jump",
    date: "03/01/2026",
    time: "06:30 AM",
    location: "Noida",
    driverName: "Priya Sharma",
    section: "Section 119 Act Of 1988",
    amount: 8750.00,
    status: "Pending"
  },
  {
    challanType: "Wrong Lane Driving",
    date: "14/02/2026",
    time: "09:15 PM",
    location: "Faridabad",
    driverName: "Vikash Gupta",
    section: "Section 177 Act Of 1988",
    amount: 12300.00,
    status: "Paid"
  },
  {
    challanType: "Parking Violation",
    date: "07/03/2026",
    time: "04:45 PM",
    location: "Gurugram",
    driverName: "Sunita Devi",
    section: "Section 122 Act Of 1988",
    amount: 5000.00,
    status: "Paid"
  },
  {
    challanType: "Mobile Phone Usage",
    date: "21/04/2026",
    time: "01:30 AM",
    location: "Meerut",
    driverName: "Rajesh Tiwari",
    section: "Section 184 Act Of 1988",
    amount: 18900.00,
    status: "Pending"
  },
  {
    challanType: "No Helmet",
    date: "12/05/2026",
    time: "07:20 AM",
    location: "Agra",
    driverName: "Manish Yadav",
    section: "Section 129 Act Of 1988",
    amount: 6500.00,
    status: "Paid"
  },
  {
    challanType: "Document Violation",
    date: "28/06/2026",
    time: "10:55 PM",
    location: "Kanpur",
    driverName: "Deepak Verma",
    section: "Section 3 Act Of 1988",
    amount: 22750.00,
    status: "Pending"
  },
  {
    challanType: "Drunk Driving",
    date: "15/08/2026",
    time: "03:40 PM",
    location: "Lucknow",
    driverName: "Anita Pandey",
    section: "Section 185 Act Of 1988",
    amount: 35000.00,
    status: "Paid"
  },
  {
    challanType: "Rash Driving",
    date: "30/09/2026",
    time: "08:10 AM",
    location: "Varanasi",
    driverName: "Suresh Mishra",
    section: "Section 279 Act Of 1988",
    amount: 25600.00,
    status: "Pending"
  }
];




const ChallanHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = challanRecords
    .filter(
      (item) =>
        item.challanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      // ||
      // item.driverName.some((i) =>
      //   i.toLowerCase().includes(searchTerm.toLowerCase())
      // )
    )

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 20
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,

    }
  };

  return (
    <>
      <div className='space'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="lg:text-[30px] font-bold text-[#000000]" style={{ fontFamily: 'Poppins, sans-serif' }}>Vehicle Challan History</h2>
          <div className="flex gap-4">
            <TextInput
              value={searchTerm}
              placeholder={"Search by keyword...2"}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ backgroundColor: `${ThemeColors.secondColor}` }}
              size={"small"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon sx={{ color: `${ThemeColors.PrimaryColor}`, fontSize: 24 }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        <div className="">
          <Carousel
            //   removeArrowOnDeviceType={["tablet", "mobile"]}
            arrows={false}
            responsive={responsive}
            // autoPlay={false}
            // autoPlaySpeed={3000}
            // transitionDuration={2000}
            //additionalTransfrom={-20}
            //  pauseOnHover={false}
            //  centerMode={false}
            containerClass=""
            itemClass="pe-3 px-1 "
            showDots={false}
            infinite={true}
            renderDotsOutside={true}
            partialVisible={true}
            className='ps-0 pb-3'
          >
            {filteredData.map((item) => (
              <div
                key={item.id}
              >
                <div className="rounded-xl shadow bg-white p-0 " style={{ fontFamily: 'inherit' }}>
                  {/* Header */}
                  <div className="rounded-t-xl px-5 py-3 " style={{ backgroundColor: '#def7ff' }}>
                    <div>
                      <div className="text-xl font-semibold text-gray-900 mb-1">Challan Type</div>
                    </div>
                    <div className='flex justify-between items-start'>
                      <div className="text-sm text-gray-700"> {item.challanType}</div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="px-5 py-4">
                    <div className="text-md font-semibold mb-2 text-gray-950">Accident Details</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center px-2 py-1 rounded bg-[#def7ff] text-sm font-medium" >
                        <FiCalendar className="mr-1" /> 25/12/2025
                      </div>
                      <div className="flex items-center px-2 py-1 rounded bg-[#def7ff] text-sm font-medium" >
                        <FiClock className="mr-1" /> 02:20 AM
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center px-2 py-1 rounded bg-[#def7ff] text-sm font-medium" >
                        <FiMapPin className="mr-1" /> {item.location}
                      </div>
                      <div className="flex items-center px-2 py-1 rounded bg-[#def7ff] text-sm font-medium" >
                        <FiUser className="mr-1" /> <span className={`text-[${ThemeColors.PrimaryColor}] underline`}>{item.driverName}</span>
                      </div>
                    </div>
                    <div className='space-y-3 mt-4'>
                      <div className="text-sm  text-gray-700">
                        Loss – No of Fatalities : <span className="font-semibold">200</span>
                      </div>
                      <div className="text-sm  text-gray-700">
                        No of Injuries : <span className="font-semibold">120</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        Driver’s rank in Fleet : <span className="font-semibold">12/35</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default ChallanHistory
