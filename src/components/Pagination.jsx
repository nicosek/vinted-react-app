import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="pagination">
      {/* Bouton Première Page */}
      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
        ⏮️ Première
      </button>

      {/* Bouton -10 Pages */}
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 10))}
        disabled={currentPage === 1}
      >
        ◀️ -10
      </button>

      {/* Bouton Précédent */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ⬅️ Précédent
      </button>

      <span>
        Page {currentPage} / {totalPages}
      </span>

      {/* Bouton Suivant */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant ➡️
      </button>

      {/* Bouton +10 Pages */}
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 10))}
        disabled={currentPage === totalPages}
      >
        +10 ▶️
      </button>

      {/* Bouton Dernière Page */}
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Dernière ⏭️
      </button>
    </div>
  );
};

export default Pagination;
