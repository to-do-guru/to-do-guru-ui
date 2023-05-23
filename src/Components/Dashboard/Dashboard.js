import "./Dashboard.css";
import ChoreCard from "../ChoreCard/ChoreCard";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_HOUSEHOLD } from "../../queries";
import { useQuery } from "@apollo/client";

const Dashboard = ({ email }) => {
  const { loading, error, data } = useQuery(GET_HOUSEHOLD, {
    fetchPolicy: "no-cache",
    variables: { email },
  });

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [dayOfWeek, setDayOfWeek] = useState("monday");
  const [chores, setChores] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (data.household[dayOfWeek]) {
        setChores(data.household[dayOfWeek]);
      } else {
        setChores([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfWeek, loading]);

  const choreCards = chores.map((chore, index) => {
    return (
      <ChoreCard
        member={chore.assignedMember}
        chore={chore.choreName}
        duration={chore.duration}
        key={index}
      />
    );
  });

  const weekButtons = daysOfWeek.map((day) => {
    if (day === dayOfWeek) {
      return (
        <button
          key={day}
          className={`day-btn ${day} selected`}
          onClick={() => setDayOfWeek(day)}
        >
          <span className="shown">{day}</span>
          <span className="hidden">{day.slice(0, 3)}</span>
        </button>
      );
    } else {
      return (
        <button
          key={day}
          className={`day-btn ${day}`}
          onClick={() => setDayOfWeek(day)}
        >
          <span className="shown">{day}</span>
          <span className="hidden">{day.slice(0, 3)}</span>
        </button>
      );
    }
  });

  if (loading) {
    return (
      <div className="loading-broom-container">
        <img className="sweeping-gif" src={require("../../images/sweeping-broom.gif")} alt="broom sweeping while loading"/>
        <h2 className="loading-msg">Loading...</h2>
      </div>
    )
  } 
  if (error) return <p className="error">"Sorry there was an error, please try again later"</p>
    
  return (
    <div className="dashboard">
      <div>
        <h1>{data.household.name} Chore Schedule</h1>
        <div className="week-nav">{weekButtons}</div>
        <section className="chore-container">
          {choreCards}
          {chores.length === 0 && (
            <p className="day-off">You have the day off, no chores today!</p>
          )}
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
