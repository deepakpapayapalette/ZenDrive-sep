import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { Fixedbox } from "../InputFields/Fixedbox";


export default function ViolationTrackerGraph() {
  const [period, setPeriod] = useState("Weekly");

  // Sample data sets
  const dataSets = {
    Weekly: [
      { day: "week 1", violations: 20 },
      { day: "week 2", violations: 320 },
      { day: "week 3", violations: 60 },
      { day: "week 4", violations: 460, high: true },
      { day: "week 5", violations: 540 },

    ],
    Daily: [
      { day: "8AM", violations: 50 },
      { day: "10AM", violations: 120 },
      { day: "12PM", violations: 90 },
      { day: "2PM", violations: 150 },
      { day: "4PM", violations: 70 },
      { day: "6PM", violations: 200 },
      { day: "8PM", violations: 80 },
    ],
    Monthly: [
      { day: "Jan", violations: 320 },
      { day: "Feb", violations: 280 },
      { day: "Mar", violations: 50, high: true },
      { day: "Apr", violations: 390 },
      { day: "May", violations: 20, high: true },
      { day: "Jun", violations: 410 },
      { day: "Jul", violations: 610, high: true },
      { day: "Aug", violations: 180 },
      { day: "Sep", violations: 350 },
      { day: "Oct", violations: 570, high: true },
      { day: "Nov", violations: 430 },
      { day: "Dec", violations: 680, high: true },
    ],
    Yearly: [
      { day: "2001", violations: 320 },
      { day: "2002", violations: 280 },
      { day: "2003", violations: 450, high: true },
      { day: "2004", violations: 390 },
      { day: "2005", violations: 520, high: true },
      { day: "2006", violations: 410 },
      { day: "2007", violations: 610, high: true },
      { day: "2008", violations: 480 },
      { day: "2009", violations: 350 },
      { day: "2010", violations: 570, high: true },
      { day: "2011", violations: 430 },
      { day: "2012", violations: 680, high: true },
    ],
  };

  const data = dataSets[period];

  const isHighViolation = (violations) => violations > 450;

  return (
    <>
      <div className="space">
        <div className="border border-gray-300 rounded-lg p-4">

          <div className="flex justify-between items-center mb-2">
            <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Violation Tracker graphs</h2>
            <div style={{ width: '200px' }}>
              <FormControl fullWidth size="small" >
                <InputLabel>Violation Tracker</InputLabel>
                <Select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  label="Violation Tracker"
                  MenuProps={Fixedbox}
                >

                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} style={{ paddingRight: '0px' }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip wrapperStyle={{ backgroundColor: '#286578', }} cursor={{ stroke: 'red', strokeWidth: 1 }} />
              <Legend iconType={'circle'} />
              <Line
                type="monotone"
                activeDot={true}
                animationDuration={3000}
                dataKey="violations"
                fill="#286578"
                label={{ position: "bottom", fill: "#286578", fontSize: '10px' }}
                barSize={50}

              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={isHighViolation(entry.violations) ? "#e11616" : "#cbd5e1"}
                  />
                ))}
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
