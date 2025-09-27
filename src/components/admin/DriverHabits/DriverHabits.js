import React, { useState } from "react";
import { FaSmoking, FaBan, FaWineGlassAlt } from "react-icons/fa"; // icons
import { Fixedbox } from "../InputFields/Fixedbox";
import DepotCard from "../../../UI/DepotCard";
import SelectInput from "../InputFields/SelectInput";

const DriverHabits = () => {
  const [selectedDepot, setSelectedDepot] = useState("ghaziabad");


  const data = [
    {
      city: "ghaziabad",
      title: "No. of Drivers who Smoking",
      value: 80,
      icon: <FaSmoking size={24} className="text-white" />,
    },
    {
      city: "ghaziabad",
      title: "No. of Drivers who have quit smoking",
      value: 40,
      icon: <FaBan size={24} className="text-white" />,
    },
    {
      city: "ghaziabad",
      title: "No. of Drivers consuming alcohol",
      value: 90,
      icon: <FaWineGlassAlt size={24} className="text-white" />,
    },
    {
      city: "ghaziabad",
      title: "No. of driver who have stopped drinking",
      value: 30,
      icon: <FaBan size={24} className="text-white" />,
    },
    {
      city: "lucknow",
      title: "No. of Drivers who Smoking",
      value: 60,
      icon: <FaSmoking size={24} className="text-white" />,
    },
    {
      city: "lucknow",
      title: "No. of Drivers who have quit smoking",
      value: 50,
      icon: <FaBan size={24} className="text-white" />,
    },
    {
      city: "lucknow",
      title: "No. of Drivers consuming alcohol",
      value: 70,
      icon: <FaWineGlassAlt size={24} className="text-white" />,
    },
    {
      city: "lucknow",
      title: "No. of driver who have stopped drinking",
      value: 40,
      icon: <FaBan size={24} className="text-white" />,
    },
    {
      city: "delhi",
      title: "No. of Drivers who Smoking",
      value: 29,
      icon: <FaSmoking size={24} className="text-white" />,
    },
    {
      city: "delhi",
      title: "No. of Drivers who have quit smoking",
      value: 30,
      icon: <FaBan size={24} className="text-white" />,
    },
    {
      city: "delhi",
      title: "No. of Drivers consuming alcohol",
      value: 40,
      icon: <FaWineGlassAlt size={24} className="text-white" />,
    },
    {
      city: "delhi",
      title: "No. of driver who have stopped drinking",
      value: 50,
      icon: <FaBan size={24} className="text-white" />,
    },
  ];

  const SelectCityes = [
    {
      label: 'Ghaziabad',
      value: 'ghaziabad'
    },
    {
      label: 'Lucknow',
      value: 'lucknow'
    },
    {
      label: 'Delhi',
      value: 'delhi'
    },

  ]

  return (
    <div className="space ">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Driver Lifestyle & Wellness Summary</h2>
        </div>
        <div className="w-[200px]">
          <SelectInput
            value={selectedDepot}
            onChange={(e) => setSelectedDepot(e.target.value)}
            label2={'Ro/Depo'}
            label={'Ro/Depo'}
            menuProps={Fixedbox}
            MenuItems={SelectCityes}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {(selectedDepot
          ? data.filter((item) => item.city === selectedDepot)
          : [])
          .map((item, index) => (
            <DepotCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              key={index}
            />
          ))}
        {!selectedDepot && (
          <div className="col-span-full text-center text-gray-500 py-8">
            Please select a city to view driver habits.
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverHabits;
