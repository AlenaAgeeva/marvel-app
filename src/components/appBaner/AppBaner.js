import "./appBaner.sass";
import avengers from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers_logo.png";

const AppBaner = () => {
  return (
    <div className="app__baner">
      <img src={avengers} alt="Avengers" />
      <div className="app__baner-text">
        New comics every week! <br />
        Stay tuned!
      </div>
      <img src={avengersLogo} alt="Avengers Logo" />
    </div>
  );
};

export default AppBaner;
