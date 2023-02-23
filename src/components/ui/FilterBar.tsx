import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { FilterProps } from "../../types";

const BasicSelect = ({
  setFilterDateAscending,
  setFilterDateDescending,
  setFilterTitleAscending,
  setFilterTitleDescending,
  setFilterPriceAscending,
  setFilterPriceDescending,
  isAdminPage,
}: FilterProps) => {
  const [sort, setSort] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  const handleChange = (e: any) => {
    setSort(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="material-box-dropdown">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          Sort by
        </InputLabel>
        {isAdminPage && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="filter"
            sx={{ color: "white" }}
            onChange={handleChange}
            value={sort}
          >
            <MenuItem value="ascendingTitle" onClick={setFilterTitleAscending}>
              Title ascending
            </MenuItem>
            <MenuItem
              value="descendingTitle"
              onClick={setFilterTitleDescending}
            >
              Title descending
            </MenuItem>
            <MenuItem value="ascendingPrice" onClick={setFilterPriceAscending}>
              Price ascending
            </MenuItem>
            <MenuItem
              value="descendingPrice"
              onClick={setFilterPriceDescending}
            >
              Price descending
            </MenuItem>
          </Select>
        )}
        {!isAdminPage && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="filter"
            sx={{ color: "white" }}
            onChange={handleChange}
            value={sort}
          >
            <MenuItem value="ascendingDate" onClick={setFilterDateAscending}>
              Date ascending
            </MenuItem>
            <MenuItem value="descendingDate" onClick={setFilterDateDescending}>
              Date descending
            </MenuItem>
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
