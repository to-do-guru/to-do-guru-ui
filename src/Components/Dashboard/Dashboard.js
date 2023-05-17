import "./Dashboard.css";
import ChoreCard from "../ChoreCard/ChoreCard";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_HOUSEHOLD } from "../../queries";
import { useQuery } from "@apollo/client";

const Dashboard = ({email}) => {
  const { loading, error, data } = useQuery(GET_HOUSEHOLD, { variables: {email} });

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

  const householdName = "Turing Fam"

  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [chores, setChores] = useState([]);

  useEffect(() => {
    filterChores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const daysOfWeek = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const weekButtons = daysOfWeek.map(day => <button key={day} className={`day-btn ${day}`} onClick={() => setDayOfWeek(day)}>{day}</button>)

  return (
    <div className="dashboard">
      {console.log('data', data)}
      {console.log('error', error)}
      {console.log('loading', loading)}
      <div>
        <h1>{householdName}'s Chore Schedule</h1>

      <div className="week-nav">
        <button className="day-btn Monday" onClick={() => setDayOfWeek("Monday")} autoFocus>Monday</button>
        {weekButtons}
      </div>

        <section className="chore-container">
          {choreCards}
          {chores.length === 0 && 
            <p className="day-off">You have the day off, no chores today!</p>}
        </section>
      </div>

      <nav>
        <NavLink to="/">
          <button className="nav-btn">Log Out</button>
        </NavLink>
        {/*this button below will run a function, not sure where it will live yet*/}
          <button className="nav-btn">Get me a new schedule</button>
        <NavLink to="/choreform">
          <button className="nav-btn">Edit Chore List</button>
        </NavLink>
        <NavLink to="/houseform">
          <button className="nav-btn">Edit Household</button>
        </NavLink>
      </nav>
    </div>
  );
};

export default Dashboard;
