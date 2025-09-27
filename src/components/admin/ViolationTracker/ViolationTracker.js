import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { FiFilter } from "react-icons/fi";
import CloseIcon from "@mui/icons-material/Close";
import { Fixedbox } from "../InputFields/Fixedbox";
import { ThemeColors } from "../../../ThemeColors";
import { Funnel } from "lucide-react";

const violationTypes = [
  "All",
  "Collision",
  "Over-speeding",
  "Fatigue",
  "Distracted Driving",
  "Harsh Braking/Acceleration",
  "Dangerous Lane Change",
  "Usage of Phone while Driving",
  "No Seat Belt while Driving",
  "Smoking while Driving",
];

export default function ViolationTracker() {
  const [driver, setDriver] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [vehicle, setVehicle] = useState("");
  const [selectedSort, setSelectedSort] = useState([]);
  const [hideSidebar, setHideSidebar] = useState('hidden');
  console.log(ThemeColors.PrimaryColor, "Fixedbox")
  const sortOptions = [
    "Collision",
    "Over-speeding",
    "Fatigue",
    "Distracted Driving",
    "Harsh Braking/ Acceleration",
    "Dangerous Lane Change",
    "Usage of Phone while Driving",
    "No Seat Belt while Driving",
    "Smoking while Driving",
  ];
  // Dummy KPI data
  const kpis = [
    { label: "Today", value: 1200, color: "#1976d2" },
    { label: "This Week", value: 1600, color: "#009688" },
    { label: "This Month", value: 2020, color: "#dda00a" },
    { label: "This Year", value: 2020, color: "#6a1b9a" },
  ];
  const toggleSort = (option) => {
    setSelectedSort((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const clearFilters = () => {
    setDriver("");
    setVehicle("");
    setSelectedSort([]);
  };

  return (
    <>
      <div className="space">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Violation Tracker</h2>
          </div>


          <Button
            className="DataFilterBtn"
            variant="contained"
            endIcon={!isMobile && <Funnel />}
            sx={{
              bgcolor: "#286578",
              textTransform: "capitalize",
              paddingBlock: "8px",
              fontFamily: "Lato, sans-serif",
            }}
            onClick={() => setHideSidebar('block ')}
          >
            {isMobile ? <Funnel /> : "Primary Data Filter :"}
          </Button>
        </div>

        <div>
          <div className={`w-[410px] bg-white shadow-md h-screen p-[30px] pt-5 filter-sidebar ${hideSidebar}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-gray-800 text-[18px]">Use Filter :</h2>
              <IconButton size="small" className="x-icon" onClick={() => setHideSidebar('hidden ')}>
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <div className="mb-4">
                <FormControl fullWidth size="small" >
                  <InputLabel>Driver Name</InputLabel>
                  <Select
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                    label="Driver Name"
                    MenuProps={Fixedbox}
                  >
                    <MenuItem value="Rohit">Rohit Kumar</MenuItem>
                    <MenuItem value="Amit">Amit Singh</MenuItem>
                    <MenuItem value="Suresh">Suresh Yadav</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Vehicle No */}
              <div className="mb-4">
                <FormControl fullWidth size="small" className="mb-6">
                  <InputLabel>Vehicle No</InputLabel>
                  <Select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    label="Vehicle No"
                    MenuProps={Fixedbox}
                  >
                    <MenuItem value="UP16AA3456">UP16 AA 3456</MenuItem>
                    <MenuItem value="DL10BB2345">DL10 BB 2345</MenuItem>
                    <MenuItem value="UP80CC7890">UP80 CC 7890</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* Data Sort By */}
              <h3 className="text-gray-800 font-medium mb-3">Data Sort By:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {sortOptions.map((option, idx) => (
                  <Button
                    key={idx}
                    size="small"
                    variant={selectedSort.includes(option) ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => toggleSort(option)}
                    className="!normal-case"
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {/* Selected Chips (optional preview) */}
              {selectedSort.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedSort.map((item, idx) => (
                    <Chip
                      // sx={{ backgroundColor: `${ThemeColors.PrimaryColor}`}}
                      key={idx}
                      label={item}
                      color={`${ThemeColors.PrimaryColor}`}
                      onDelete={() => toggleSort(item)}
                      bgcolor='orange'
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-auto">
              <Button
                variant="outlined"
                onClick={clearFilters}
                className="!px-6 !rounded-lg"
              >
                Clear
              </Button>
              <Button
                variant="contained"
                className={`!px-6 !rounded-lg`}
                sx={{ backgroundColor: `${ThemeColors.PrimaryColor}` }}
              >
                Apply
              </Button>
            </div>



          </div>
        </div>




        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {kpis.map((item, idx) => (
            <div
              key={idx}
              className={` text-white rounded-xl p-6 shadow-md `}
              style={{ backgroundColor: `${item.color}` }} >
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <p className="text-xl">{item.label}</p>
                </div>
              </div>
              <h2 className="text-4xl font-bold">{item.value.toLocaleString()}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
