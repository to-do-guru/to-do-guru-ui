import "./Dashboard.css";
import ChoreCard from "../ChoreCard/ChoreCard";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const dummyData = [
    {
      member: "Steve",
      chore: "Wash Dishes",
      duration: 30,
      day: "Monday",
    },
    {
      member: "Jenny",
      chore: "Laundry",
      duration: 60,
      day: "Monday",
    },
    {
      member: "Steve",
      chore: "Wash Dishes",
      duration: 30,
      day: "Wednesday",
    },
    {
      member: "Jenny",
      chore: "Sweep Floor",
      duration: 30,
      day: "Thursday",
    },
    {
      member: "Steve",
      chore: "Wash Dishes",
      duration: 30,
      day: "Friday",
    },
    {
      member: "Jenny",
      chore: "Take Out Trash",
      duration: 15,
      day: "Saturday",
    },
    {
      member: "Steve",
      chore: "Mow Lawn",
      duration: 120,
      day: "Saturday",
    },
    {
      member: "Jenny",
      chore: "Wash Dishes",
      duration: 30,
      day: "Sunday",
    },
  ];

  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [chores, setChores] = useState([]);

  useEffect(() => {
    filterChores();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfWeek]);

  const filterChores = () => {
    setChores(dummyData.filter((chore) => chore.day === dayOfWeek));
  };

  const choreCards = chores.map((chore, index) => {
    return (
      <ChoreCard
        member={chore.member}
        chore={chore.chore}
        duration={chore.duration}
        key={index}
      />
    );
  });

  return (
    <>
      <h1>I AM A Dashboard</h1>

      <button onClick={() => setDayOfWeek("Monday")}>Monday</button>
      <button onClick={() => setDayOfWeek("Tuesday")}>Tuesday</button>
      <button onClick={() => setDayOfWeek("Wednesday")}>Wedesday</button>
      <button onClick={() => setDayOfWeek("Thursday")}>Thursday</button>
      <button onClick={() => setDayOfWeek("Friday")}>Friday</button>
      <button onClick={() => setDayOfWeek("Saturday")}>Saturday</button>
      <button onClick={() => setDayOfWeek("Sunday")}>Sunday</button>

      <section className="chore-container">
        {choreCards}
        {chores.length === 0 && 
          <p>"You have the day off, no chores today!"</p>}
      </section>
      <NavLink to="/">
        <button>Log Out</button>
      </NavLink>
      {/*this button below will run a function, not sure where it will live yet*/}
      <button>Get me a new schedule</button>
      <NavLink to="/choreform">
        <button>Edit Chore List</button>
      </NavLink>
      <NavLink to="/houseform">
        <button>Edit Household</button>
      </NavLink>
    </>
  );
};

export default Dashboard;
