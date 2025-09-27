import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ThemeColors } from '../ThemeColors';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiDownload } from 'react-icons/fi';
import TextInput from '../components/admin/InputFields/InputFields';
const fleetData = [
  {
    causeOfAccident: "Vehicle's Fault",
    reportType: "Report",
    category: "Accident Details",
    date: "25/12/2025",
    time: "02:20 AM",
    location: "Ghaziabad",
    driverName: "Rohit Kumar",
    fatalities: 200,
    injuries: 120,
    driverRank: "12/35"
  },
  {
    causeOfAccident: "Driver's Negligence",
    reportType: "Report",
    category: "Accident Details",
    date: "18/11/2025",
    time: "11:45 PM",
    location: "Delhi",
    driverName: "Amit Singh",
    fatalities: 85,
    injuries: 156,
    driverRank: "8/42"
  },
  {
    causeOfAccident: "Weather Conditions",
    reportType: "Report",
    category: "Accident Details",
    date: "03/01/2026",
    time: "06:30 AM",
    location: "Noida",
    driverName: "Priya Sharma",
    fatalities: 45,
    injuries: 78,
    driverRank: "15/28"
  },
  {
    causeOfAccident: "Road Conditions",
    reportType: "Report",
    category: "Accident Details",
    date: "14/02/2026",
    time: "09:15 PM",
    location: "Faridabad",
    driverName: "Vikash Gupta",
    fatalities: 132,
    injuries: 203,
    driverRank: "22/50"
  },
  {
    causeOfAccident: "Mechanical Failure",
    reportType: "Report",
    category: "Accident Details",
    date: "07/03/2026",
    time: "04:45 PM",
    location: "Gurugram",
    driverName: "Sunita Devi",
    fatalities: 67,
    injuries: 89,
    driverRank: "5/33"
  },
  {
    causeOfAccident: "Human Error",
    reportType: "Report",
    category: "Accident Details",
    date: "21/04/2026",
    time: "01:30 AM",
    location: "Meerut",
    driverName: "Rajesh Tiwari",
    fatalities: 178,
    injuries: 245,
    driverRank: "31/45"
  },
  {
    causeOfAccident: "Vehicle's Fault",
    reportType: "Report",
    category: "Accident Details",
    date: "12/05/2026",
    time: "07:20 AM",
    location: "Agra",
    driverName: "Manish Yadav",
    fatalities: 94,
    injuries: 167,
    driverRank: "19/38"
  },
  {
    causeOfAccident: "Traffic Signal Violation",
    reportType: "Report",
    category: "Accident Details",
    date: "28/06/2026",
    time: "10:55 PM",
    location: "Kanpur",
    driverName: "Deepak Verma",
    fatalities: 156,
    injuries: 189,
    driverRank: "27/41"
  },
  {
    causeOfAccident: "Over Speeding",
    reportType: "Report",
    category: "Accident Details",
    date: "15/08/2026",
    time: "03:40 PM",
    location: "Lucknow",
    driverName: "Anita Pandey",
    fatalities: 112,
    injuries: 134,
    driverRank: "9/29"
  },
  {
    causeOfAccident: "External Factors",
    reportType: "Report",
    category: "Accident Details",
    date: "30/09/2026",
    time: "08:10 AM",
    location: "Varanasi",
    driverName: "Suresh Mishra",
    fatalities: 203,
    injuries: 278,
    driverRank: "35/47"
  }
];


const AccidentHistorySlider = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = fleetData
    .filter(
      (item) =>
        item.causeOfAccident.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <h2 className="lg:text-[30px] font-bold text-[#000000]" style={{ fontFamily: 'Poppins, sans-serif' }}>Accident History</h2>
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
                      <div className="text-xl font-semibold text-gray-900 mb-1">{item.causeOfAccident}</div>
                    </div>
                    <div className='flex justify-between items-start'>
                      <div className="text-sm text-gray-700">Vehicle’s Fault</div>
                      <a href="#" className="flex items-center space-x-1 text-sm font-medium" style={{ color: '#286578' }}>
                        <FiDownload className="w-4 h-4" />
                        <span>Report</span>
                      </a>
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
                        <FiMapPin className="mr-1" /> Ghaziabad
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

export default AccidentHistorySlider
