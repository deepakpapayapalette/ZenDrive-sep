import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Menu,
} from "@mui/material";
import { Fixedbox } from "../InputFields/Fixedbox";
import { DataGrid, GridMoreVertIcon } from '@mui/x-data-grid';

export default function DriverHealthStatistics() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Dropdown data
  const healthParameters = {
    Vision: [
      {
        name: "Glaucoma/ Peripheral Vision Loss",
        cases: 20,
        coMorbidity: 2,
        critical: 2,
        improved: 20,
        notImproved: 2,
      },
      {
        name: "Colour Blindness",
        cases: 2,
        coMorbidity: 2,
        critical: 2,
        improved: 2,
        notImproved: 2,
      },
      {
        name: "Night Blindness",
        cases: 12,
        coMorbidity: 0,
        critical: 0,
        improved: 12,
        notImproved: 0,
      },
      {
        name: "Blurred Vision",
        cases: 6,
        coMorbidity: 0,
        critical: 0,
        improved: 6,
        notImproved: 0,
      },
    ],
    Hearing: [
      {
        name: "Hearing Loss",
        cases: 15,
        coMorbidity: 3,
        critical: 1,
        improved: 10,
        notImproved: 5,
      },
    ],
  };

  // States
  const [selectedHealth, setSelectedHealth] = useState("Vision");
  const [selectedSubHealth, setSelectedSubHealth] = useState("");

  // Data filtering
  const subOptions = healthParameters[selectedHealth] || [];
  const filteredData = selectedSubHealth
    ? subOptions.filter((item) => item.name === selectedSubHealth)
    : subOptions;

  const tableColumns = [
    {
      field: "Health Parameters",
      headerName: "Health Parameters",
      width: 270,
      headerClassName: "health-table-header-style",
      renderCell: (params) => (
        <span>{params.row?.name || "N/A"}</span>
      ),
      //  flex: 1,

    },
    {
      field: "No of cases",
      headerName: "No of cases",
      width: 150,
      headerClassName: "health-table-header-style",
      renderCell: (params) => (
        <span>{params.row?.cases || "N/A"}</span>
      ),
      //  flex: 1
      align: 'center',
    },
    {
      field: "No of cases with co-morbidity",
      headerName: "No of cases with co-morbidity",
      width: 240,
      headerClassName: "health-table-header-style",
      renderCell: (params) => (
        <span>{params.row?.coMorbidity || "N/A"}</span>
      ),
      //  flex: 1,
      align: 'center',
    },
    {
      field: "No of cases report as critical cases",
      headerName: "No of cases report as critical cases",
      width: 240,
      headerClassName: "health-table-header-style",
      renderCell: (params) => (
        <span>{params.row?.critical || "N/A"}</span>
      ),
      //  flex: 1,
      align: 'center',
    },
    {
      field: "No of cases has improvements",
      headerName: " No of cases has improvements",
      width: 220,
      headerClassName: "health-table-header-style",
      renderCell: (params) => (
        <span>{params.row?.improved || "N/A"}</span>
      ),
      //  flex: 1,
      align: 'center',
    },
    {
      field: "No of cases has no improvements",
      headerName: "No of cases has no improvements",
      width: 188,
      headerClassName: "health-table-header-style",
      renderCell: (params) => (
        <span>{params.row?.notImproved || "N/A"}</span>
      ),
      //  flex: 1,
      align: 'center',

    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "health-table-header-style",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <div
              className="flex items-center justify-center  cursor-pointer"
              data-bs-toggle="dropdown"
            >
              <GridMoreVertIcon
                sx={{ color: "gray", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}
                className="h-6 w-6"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                MenuProps={{
                  disablePortal: true,
                  disableScrollLock: true,
                }}
              />
            </div>
            {/* Dropdown Menu */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </>
        );
      },
    }

  ];

  return (
    <div className="space">
      <div className="flex flex-col md:flex-row justify-between">

        <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Driver's Health Statistics</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <FormControl className="!min-w-[200px]">
            <InputLabel>Health Parameters</InputLabel>
            <Select
              MenuProps={Fixedbox}
              value={selectedHealth}
              label="Health Parameters"
              onChange={(e) => {
                setSelectedHealth(e.target.value);
                setSelectedSubHealth("");
              }}
            >
              {Object.keys(healthParameters).map((param) => (
                <MenuItem key={param} value={param}>
                  {param}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="!min-w-[250px]">
            <InputLabel>Sub-Health Parameters</InputLabel>
            <Select
              value={selectedSubHealth}
              label="Sub-Health Parameters"
              onChange={(e) => setSelectedSubHealth(e.target.value)}
              MenuProps={Fixedbox}
            >
              <MenuItem value="">All</MenuItem>
              {subOptions.map((item, index) => (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Table */}
      {/* <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table>
          <TableHead>
            <TableRow className={`bg-[${ThemeColors.PrimaryColor}]`}>
              <TableCell className="text-white font-semibold">
                Health Parameters
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases with co-morbidity
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases report as critical cases
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases has improvements
              </TableCell>
              <TableCell className="text-white font-semibold">
                No of cases has no improvements
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.cases}</TableCell>
                <TableCell>{row.coMorbidity}</TableCell>
                <TableCell>{row.critical}</TableCell>
                <TableCell>{row.improved}</TableCell>
                <TableCell>{row.notImproved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <DataGrid
        rows={filteredData}
        loading={false}
        columns={tableColumns}
        pageSize={10}
        autoHeight
        pagination
        getRowId={(row) => row.name}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}
      />
    </div>
  );
}
