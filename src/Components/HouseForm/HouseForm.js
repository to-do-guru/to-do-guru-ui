import "./HouseForm.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOUSE_INFO } from "../../queries";

const HouseForm = ({ id, email }) => {
  const [members, setMembers] = useState([]);
  const [householdName, setHouseholdName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editMember, setEditMember] = useState(false);

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
    // do something here to show the user that their info was successfully submitted
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

  const addMember = () => {
    editMember ? setEditMember(false) : setEditMember(true);
  }

  const toggleEdit = () => {
    editMode ? setEditMode(false) : setEditMode(true);
    // bug happening where required attribute on HTML not working for housename edit
    // there's probably a way to combine this and addMember but idk if it's worth it
  }

  return (
    <div className="edit-house">
      <h1>Edit your Household!</h1>
      <form className="house-form">
        {!editMode && 
          <div className="household-input">
            <p>{householdName}</p>
            <button onClick={toggleEdit}><span class="material-symbols-outlined">edit</span></button>
          </div>}
        {editMode &&           
          <div className="edit-household-name">
            <input
              type="text"
              name="householdName"
              placeholder="Name Your Household"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              required
            />
            <button onClick={toggleEdit} className="submit-name">Submit Name</button>
          </div>
        }
        {memberInputs}
        {!editMember && <button className="house-btn" onClick={addMember}>
          Add Member
        </button>}
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
