import GameList from "../components/GameList";
import { useEffect, useState } from "react";

function CalendarPage() {
  // const DUMMY_GAMES = [
  //   {
  //     date: "May 32, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 10,
  //     numOut: 2,
  //     team: "Rye",
  //     description: "",
  //   },
  //   {
  //     date: "June 1, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 9,
  //     numOut: 1,
  //     team: "Bayberry Volleyball",
  //     description:
  //       "I just want to test what happens if i put a really long description for a " +
  //       "game so i am going to keep writing as far as I can see on my screen",
  //   },
  //   {
  //     date: "June 4, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 8,
  //     numOut: 15,
  //     team: "Bayberry Volleyball",
  //     description: "",
  //   },
  //   {
  //     date: "June 4, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 8,
  //     numOut: 15,
  //     team: "Clinic",
  //     description: "This is the clinic for the kids",
  //   },
  // ];

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all the current games in the database
  useEffect(() => {
    fetch("https://volleyball-25620-default-rtdb.firebaseio.com/games.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tempGames = [];
        for (const key in data) {
          const game = {
            id: key,
            ...data[key],
          };
          tempGames.push(game);
        }
        setGames(tempGames);
        setLoading(false);
      });
  }, []);

  return !loading && <GameList games={games} />;
}

export default CalendarPage;
