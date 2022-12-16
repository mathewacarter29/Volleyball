import NewGameForm from "../components/NewGameForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, push, get } from "firebase/database";
import firebase from "../util/firebase";

function NewGamePage() {
  //Object to allow us to keep track of the URL
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const db = getDatabase(firebase);
    get(ref(db, "teams"))
      .then((snapshot) => {
        const data = snapshot.val();
        setTeams(Object.values(data));
      })
      .then(() => {
        get(ref(db, "locations"))
          .then((snapshot) => {
            const data = snapshot.val();
            setLocations(Object.values(data));
          })
          .then(() => {
            setLoading(false);
          });
      });
  }, []);

  function addNewGame(game) {
    const db = getDatabase(firebase);
    push(ref(db, "games/"), game).then(() => {
      navigate("/calendar", { replace: true });
    });
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
