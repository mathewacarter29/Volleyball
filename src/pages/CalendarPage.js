import GameList from "../components/GameList";

function CalendarPage() {
  const DUMMY_GAMES = [
    {
      date: "May 32, 2069",
      start_time: "6:00pm",
      end_time: "8:00pm",
      location: "Bayberry",
      numIn: 10,
      numOut: 2,
    },
    {
      date: "June 1, 2069",
      start_time: "6:00pm",
      end_time: "8:00pm",
      location: "Bayberry",
      numIn: 9,
      numOut: 1,
    },
    {
      date: "June 4, 2069",
      start_time: "6:00pm",
      end_time: "8:00pm",
      location: "Bayberry",
      numIn: 8,
      numOut: 15,
    },
    {
      date: "June 4, 2069",
      start_time: "6:00pm",
      end_time: "8:00pm",
      location: "Bayberry",
      numIn: 8,
      numOut: 15,
    },
  ];

  return (
    <div>
      <GameList games={DUMMY_GAMES} />
    </div>
  );
}

export default CalendarPage;
