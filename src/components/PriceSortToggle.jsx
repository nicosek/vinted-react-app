import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./PriceSortToggle.css";

const PriceSortToggle = ({ sortOrder, handleSortOrderToggle }) => {
  return (
    <div className="price-sort-toggle">
      <span>Trier par prix :</span>
      <button className="toggle-button" onClick={handleSortOrderToggle}>
        {sortOrder === "price-asc" ? (
          <ArrowUpward
            sx={{ fontSize: 30 }}
            style={{ stroke: "#333", strokeWidth: 2 }}
          />
        ) : (
          <ArrowDownward
            sx={{ fontSize: 30 }}
            style={{ stroke: "#333", strokeWidth: 2 }}
          />
        )}
      </button>
    </div>
  );
};

export default PriceSortToggle;
