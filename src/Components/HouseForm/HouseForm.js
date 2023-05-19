import "./HouseForm.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CHANGE_HOUSE_NAME, GET_HOUSE_INFO } from "../../queries";

const HouseForm = ({ id, email }) => {
  const [members, setMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({id:"", name:""});
  const [householdName, setHouseholdName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editMember, setEditMember] = useState(false);

  const { loading: queryLoading, data: queryData, error: queryError } = useQuery(GET_HOUSE_INFO, {
    variables: { email },
  });

  const [updateHousehold, {data: mutationData, loading: mutationLoading, error: mutationError}] = useMutation(CHANGE_HOUSE_NAME);

  useEffect(() => {
    if (!queryLoading) {
      setMembers(queryData.household.members);
      setHouseholdName(queryData.household.name);
    }
    if (!mutationLoading) {
      console.log(mutationData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryLoading, mutationLoading]);

  const memberInputs = members.map((member) => (
    <div key={member.id} className="member">
      <p>{member.name}</p>
      <button onClick={() => deleteMember(member.id)} className="delete">
        Delete
      </button>
    </div>
  ));

  const deleteMember = (id) => {
    const filter = members.filter((member) => member.id !== id);
    setMembers(filter);
    // eventually delete requests to backend
  };

  const submitMember = (event) => {
    if (currentMember.name) {
      event.preventDefault();
      setMembers([...members, currentMember]);
      setCurrentMember({id:"", name:""});
      setEditMember(false);
    }
    // Add mutation query for BE 
  };

  const submitHouseholdName = (event) => {
    if (householdName) {
      const input = {id: id, name: householdName}
      event.preventDefault();
      setEditMode(false);
      updateHousehold({variables: { input: input }});
    }
  };

  return (
    <div className="edit-house">
      <h1>Edit your Household!</h1>
      <div className="house-form">
        {!editMode && (
          <div className="household-input">
            <p>{householdName}</p>
            <button onClick={() => setEditMode(true)}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        )}
        {editMode && (
          <form className="edit-household-name">
            <input
              type="text"
              name="householdName"
              placeholder="Name Your Household"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              required
            />
            <button
              type="submit"
              onClick={(event) => submitHouseholdName(event)}
              className="submit-name"
            >
              Submit Name
            </button>
          </form>
        )}
        {memberInputs}
        {!editMember && (
          <button className="house-btn" onClick={() => setEditMember(true)}>
            Add Chore-Doer
          </button>
        )}
        {editMember && (
          <form className="member-input">
            <input
              type="text"
              placeholder="Name of chore-doer"
              onChange={(e) =>
                setCurrentMember({
                  id: members[members.length - 1].id + 1,
                  name: e.target.value,
                })
              }
              required
            />
            <button
              className="submit-member"
              type="submit"
              onClick={(event) => submitMember(event)}
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <NavLink to="/dashboard">
        <button className="house-btn">See Schedule</button>
      </NavLink>
    </div>
  );
};

export default HouseForm;
