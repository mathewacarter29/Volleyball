import NewGameForm from "../components/NewGameForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NewGamePage() {
  //Object to allow us to keep track of the URL
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    //fetch the teams
    fetch("https://volleyball-25620-default-rtdb.firebaseio.com/teams.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tempTeams = [];
        for (const i in data) {
          tempTeams.push(data[i]);
        }
        setTeams(tempTeams);
      });

    //fetch the locations
    fetch("https://volleyball-25620-default-rtdb.firebaseio.com/locations.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tempLocs = [];
        for (const i in data) {
          tempLocs.push(data[i]);
        }
        setLocations(tempLocs);
        setLoading(false);
      });
  }, []);

  function addNewGame(game) {
    console.log(game);
    fetch("https://volleyball-25620-default-rtdb.firebaseio.com/games.json", {
      method: "POST",
      body: JSON.stringify(game),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/calendar", { replace: true }));
  }

  return (
    !loading && (
      <NewGameForm
        locations={locations}
        teams={teams}
        addNewGame={addNewGame}
      />
    )
  );
}

export default NewGamePage;
