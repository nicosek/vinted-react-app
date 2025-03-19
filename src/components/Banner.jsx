import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = ({ handlePublishClick }) => {
  const navigate = useNavigate();
  return (
    <section className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button
            className="btn-sell"
            onClick={() => handlePublishClick(navigate)}
          >
            Commencer à vendre
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
