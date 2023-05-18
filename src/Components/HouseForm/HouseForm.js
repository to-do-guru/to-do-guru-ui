import "./HouseForm.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOUSE_INFO } from "../../queries";
import { useEffect } from "react";

const HouseForm = ({ id, email }) => {
  const [members, setMembers] = useState([]);
  const [householdName, setHouseholdName] = useState("");

  const { loading, data, error } = useQuery(GET_HOUSE_INFO, {
    variables: { email },
  });

  useEffect(() => {
    if (!loading) {
      setMembers(data.household.members);
      setHouseholdName(data.household.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const submitForm = (event) => {
    event.preventDefault();
    // this is where the post to BE with changes will eventually happen
  };

  const memberInputs = members.map((member) => (
    <div key={member.id} className="member">
      <p>{member.name}</p>
      <button onClick={() => deleteMember(member.id)} className="delete">Delete</button>
    </div>
  ));

  const deleteMember = (id) => {
    const filter = members.filter(member => member.id !== id)
    setMembers(filter)
    // eventually delete requests to backend
  }

  return (
    <div className="edit-house">
      <h1>Edit your Household!</h1>
      <form className="house-form">
        <input
          type="text"
          name="householdName"
          placeholder="Name Your Household"
          value={householdName}
          onChange={(e) => setHouseholdName(e.target.value)}
          required
        />
        {memberInputs}
        {/* <button onClick={}>Add Member</button> */}
        <button className="house-btn" onClick={submitForm}>
          Submit
        </button>
      </form>
      <NavLink to="/dashboard">
        <button className="house-btn">See Schedule</button>
      </NavLink>
    </div>
  );
};

export default HouseForm;
