import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import logo from "../media/logo.png";

function NavigationBar() {
  return (
    <header className={classes.container}>
      <div className={classes.left_wrapper}>
        <img className={classes.logo} src={logo} alt="logo"></img>
        <Link to="/">Bayberry Volleyball</Link>
      </div>

      <div className={classes.right_wrapper}>
        <Link to="/calendar">Calendar</Link>
        <Link style={{ margin: 50 }} to="/create-new-game">
          Create New Game
        </Link>
      </div>
    </header>
  );
}

export default NavigationBar;
