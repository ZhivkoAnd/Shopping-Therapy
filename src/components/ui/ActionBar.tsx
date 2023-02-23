import Search from "./SearchInput";
import Filters from "./FilterBar";
import { FilterProps } from "../../types";

const ActionBar = ({
  inputQuery,
  setInputQuery,
  setFilterDateAscending,
  setFilterDateDescending,
  setFilterTitleAscending,
  setFilterTitleDescending,
  setFilterPriceAscending,
  setFilterPriceDescending,
  isAdminPage,
}: FilterProps) => {
  return (
    <div className="action-bar">
      <Filters
        setFilterDateAscending={setFilterDateAscending}
        setFilterDateDescending={setFilterDateDescending}
        setFilterTitleAscending={setFilterTitleAscending}
        setFilterTitleDescending={setFilterTitleDescending}
        setFilterPriceAscending={setFilterPriceAscending}
        setFilterPriceDescending={setFilterPriceDescending}
        isAdminPage={isAdminPage}
      />
      <Search inputQuery={inputQuery} setInputQuery={setInputQuery} />
    </div>
  );
};

export default ActionBar;
