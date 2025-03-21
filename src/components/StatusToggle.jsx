import "./StatusToggle.css";

const StatusToggle = ({ selectedStatus, updateFilters }) => {
  const handleStatusChange = (status) => {
    updateFilters({ status });
  };

  return (
    <div className="status-toggle">
      <button
        className={selectedStatus === null ? "active" : ""}
        onClick={() => handleStatusChange(null)}
      >
        Tout
      </button>
      <button
        className={selectedStatus === "available" ? "active" : ""}
        onClick={() => handleStatusChange("available")}
      >
        Dispo
      </button>
      <button
        className={selectedStatus === "sold" ? "active" : ""}
        onClick={() => handleStatusChange("sold")}
      >
        Vendu
      </button>
    </div>
  );
};

export default StatusToggle;
