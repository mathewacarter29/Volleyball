import rye2021 from "../media/Rye2021.png";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="main">
      <h1>Welcome to Bayberry Volleyball!</h1>
      <img src={rye2021} alt={rye2021}></img>
      <h2>Insert more media below</h2>
    </div>
  );
}

export default HomePage;
