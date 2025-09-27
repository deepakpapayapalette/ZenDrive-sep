import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  IconButton,
  FormLabel,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Funnel } from "lucide-react";


export default function FilterSidebar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [fleet, setFleet] = useState("");
  const [year, setYear] = useState("");
  const [staffType, setStaffType] = useState("");

  const [hideSidebar, setHideSidebar] = useState('hidden');


  return (
    <>
      <div>
        <div className='flex justify-between'>
          <div
            className="text-[30px] font-semibold mb-3"
            style={{ fontFamily: 'Poppins-Medium,  sans-serif', fontWeight: 500 }}
          >
            Overview
          </div>
          <div>

            <Button
              className="DataFilterBtn"
              variant="contained"
              endIcon={!isMobile && <Funnel />} // ✅ icon on large, hidden on mobile
              sx={{
                bgcolor: "#286578",
                textTransform: "capitalize",
                paddingBlock: "8px",
                fontFamily: "Lato, sans-serif",
              }}
              onClick={() => setHideSidebar("block")}
            >
              {isMobile ? <Funnel /> : "Primary Data Filter :"}
            </Button>
          </div>
        </div>
        <div className={`max-w-[410px] bg-white shadow-md h-screen p-[30px] pt-5 filter-sidebar ${hideSidebar}`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-800 text-[18px]">Use Filter :</h2>
            <IconButton size="small" className="x-icon" onClick={() => setHideSidebar('hidden ')}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Fleet Dropdown */}
          <FormControl fullWidth size="small" className="mb-4"
            sx={{
              borderRadius: '20px',
            }}
          >
            <InputLabel>Select Your Fleet</InputLabel>
            <Select
              value={fleet}
              onChange={(e) => setFleet(e.target.value)}
              label="Select Your Fleet"
            >
              <MenuItem value="fleet1">Fleet 1</MenuItem>
              <MenuItem value="fleet2">Fleet 2</MenuItem>
              <MenuItem value="fleet3">Fleet 3</MenuItem>
            </Select>
          </FormControl>

          {/* Date Range */}
          <div className="flex gap-3 mb-4">
            <div>
              <FormLabel className="mb-2">From Date</FormLabel>
              <TextField
                type="date"
                // label="From Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />

            </div>
            <div>
              <FormLabel className="mb-2">To Date</FormLabel>
              <TextField
                type="date"
                // label="To Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />
            </div>
          </div>

          {/* Year Dropdown */}
          <FormControl fullWidth size="small" className="mb-4">
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              label="Year"
            >
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>

          {/* Staff Type */}
          <FormControl component="fieldset" className="mb-4">
            <RadioGroup
              value={staffType}
              onChange={(e) => setStaffType(e.target.value)}
            >
              <FormControlLabel
                value="regular"
                control={<Radio size="small" />}
                label="Regular Staff"
              />
              <FormControlLabel
                value="contractual"
                control={<Radio size="small" />}
                label="Contractual Staff"
              />
            </RadioGroup>
          </FormControl>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-auto">
            <Button
              variant="outlined"
              className={` !border-[#286578] border-2 !px-6 !rounded-lg !text-[#286578] `}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              className="!bg-teal-700 !px-6 !rounded-lg"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
