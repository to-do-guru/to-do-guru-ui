import "./Dashboard.css";
import ChoreCard from "../ChoreCard/ChoreCard";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_HOUSEHOLD, RANDOMIZE_CHORES } from "../../queries";
import { useQuery, useMutation } from "@apollo/client";

const Dashboard = ({ email }) => {
  const [members, setMembers] = useState([]);
  const hexCodes = ['#564787', '#004BA8', '#04724D', '#43AA8B', '#28587B', '#C52184', '#5A1807', '#F17300','#695958', '#38023B'];

  const { loading, error, data, refetch } = useQuery(GET_HOUSEHOLD, {
    fetchPolicy: "no-cache",
    variables: { email },
    onCompleted: (data, loading) => {
      if(!loading) {
        if (data.household[dayOfWeek]) {
            setChores(data.household[dayOfWeek]);
            const memberColors = data.household.members.map((member, index) => 
              { return { color: hexCodes[index], name: member.name, id: member.id } } 
            );
            setMembers(memberColors);
          } else {
            setChores([]);
          }
      }
    }
  });

  // eslint-disable-next-line
  const [randomizeChoresMutation, { data: randomizeData, loading: randomizeLoading }] = useMutation(RANDOMIZE_CHORES, {
    fetchPolicy: "no-cache",
    onCompleted: (randomizeLoading) => {
      refetch()
      if(!randomizeLoading) {
        if (data.household[dayOfWeek]) {
            setChores(data.household[dayOfWeek]);
          } else {
            setChores([]);
          }
      }
    }
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
        allMembers={members}
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

  const randomizeChores = () => {
    const input = {id: data.household.id };
    randomizeChoresMutation({ variables: {input} });
  }

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
        <button className="nav-btn" onClick={randomizeChores}>Get me a new schedule</button>
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
