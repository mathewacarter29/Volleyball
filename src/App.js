import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import NewGamePage from "./pages/NewGamePage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/create-new-game" element={<NewGamePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
