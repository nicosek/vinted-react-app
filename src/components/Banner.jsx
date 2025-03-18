import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button className="btn-sell">Commencer à vendre</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
