import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ThemeColors } from "../../../ThemeColors";
import SelectInput from "../InputFields/SelectInput";

export default function HealthAssessment() {
  const [disease, setDisease] = useState("Thyroids");
  const [age, setAge] = useState("");
  const [sortBy, setSortBy] = useState("Current Issues");

  // Example dataset (can be fetched from API)
  const diseaseData = {
    Thyroids: { healthIssues: 185, criticalCases: 65 },
    Diabetes: { healthIssues: 220, criticalCases: 40 },
    BP: { healthIssues: 150, criticalCases: 25 },
  };

  const COLORS = ["#008000", "#B22222"]; // green & red

  const chartData = [
    { name: "No of drivers with health Issues", value: diseaseData[disease].healthIssues },
    { name: "No of critical cases", value: diseaseData[disease].criticalCases },
  ];

  const SortDropDownList = [{ value: 'Current Issues', label: 'Current Issues', }, { value: '"Past Illness', label: '"Past Illness' }, { value: '"Family History', label: '"Family History' }]
  const medicalConditions = [
    { label: "Thyroids", value: "Thyroids" },
    { label: "Diabetes", value: "Diabetes" },
    { label: "Blood Pressure", value: "Blood Pressure" }
  ];
  const ageRanges = [
    { label: "18-30", value: "18-30" },
    { label: "31-50", value: "31-50" },
    { label: "51+", value: "51+" }
  ];
  return (
    <div className="space">
      <Card className=" shadow-md border border-gray-300 rounded-xl bg-gray-100">
        <CardContent>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-bold">
              Driver's Health Assessment Summary
            </Typography>
            {/* Sort Dropdown */}
            <div>
              <SelectInput
                className="min-w-[150px]"
                size="small"
                label2={'Sort by'}
                label={'Sort by'}
                onChange={(e) => setSortBy(e.target.value)}
                MenuItems={SortDropDownList}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Pie Chart */}
            <div className="flex justify-center items-center w-full md:w-1/2">
              <PieChart width={300} height={250}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  // innerRadius={10}

                  //  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-full md:w-1/2 gap-4">
              {/* Disease & Age Filters */}
              <p className="pb-3">Choose Disease and show report of driver</p>
              <div className="flex gap-4">
                <SelectInput
                  className="min-w-[150px]"
                  size="small"
                  label2={'Disease'}
                  label={'Disease'}
                  onChange={(e) => setDisease(e.target.value)}
                  value={disease}
                  MenuItems={medicalConditions}
                />

                <SelectInput
                  className="min-w-[150px]"
                  size="small"
                  label2={'Age'}
                  label={'Age'}
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  MenuItems={ageRanges}
                />
              </div>

              {/* Results */}
              <div className={`bg-[${ThemeColors.secondColor}] p-3 rounded-md`} >
                <h5 variant="subtitle1" className="font-semibold mb-3">
                  Result Show For {disease}
                </h5>
                <Typography variant="body2">
                  No of drivers with health Issues: {diseaseData[disease].healthIssues}
                </Typography>
                <Typography variant="body2">
                  No of critical cases: {diseaseData[disease].criticalCases}
                </Typography>
              </div>

              {/* Total Drivers */}
              <div className="flex flex-col gap-2">
                <Typography variant="h6" className="font-semibold">
                  Total No. of Drivers <span className="bg-[#def7ff]  px-2 rounded-md py-1 font-semibold">1200</span>
                </Typography>
                <div className="flex justify-between">

                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-700"></span>
                    <Typography variant="body2">
                      No of drivers with health Issues
                    </Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-700"></span>
                    <Typography variant="body2">No of critical cases</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
