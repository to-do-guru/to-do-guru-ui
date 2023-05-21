import "./HouseForm.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CHANGE_HOUSE_NAME, GET_HOUSE_INFO, DELETE_MEMBER_NAME, ADD_MEMBER_NAME } from "../../queries";


const HouseForm = ({ id, email }) => {
  const [members, setMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({id:"", name:""});
  const [householdName, setHouseholdName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editMember, setEditMember] = useState(false);

  const { data: queryData, error: queryError } = useQuery(GET_HOUSE_INFO, {
      fetchPolicy: "no-cache",
      onCompleted: (queryData) => {setMembers(queryData.household.members)
      setHouseholdName(queryData.household.name)},
      variables: { email },
  });

  const [updateHousehold, { data: mutationData, error: mutationError }] = useMutation(CHANGE_HOUSE_NAME, {
    fetchPolicy: "no-cache",
    onCompleted: (mutationData) => setHouseholdName(mutationData.updateHousehold.household.name)
  });
  const [deleteMemberName, { data: deleteData, error: deleteError }] = useMutation(DELETE_MEMBER_NAME, {
    fetchPolicy: "no-cache",
    onCompleted: (deleteData) => {
      const filter = members.filter((member) => member.name !== deleteData.memberDelete.member.name);
      setMembers(filter);
    }
  });
  const [createMember, { data: createMemberData, error: createMemberError }] = useMutation(ADD_MEMBER_NAME, {
    fetchPolicy: "no-cache",
    onCompleted: (createMemberData) => {
      const newMember = {id: createMemberData.createMember.member.id, name: createMemberData.createMember.member.name}
      setMembers([...members, newMember])
      setCurrentMember({name:""})
      setEditMember(false)}
  });

  const memberInputs = members.map((member) => (
    <div key={member.id} className="member">
      <p>{member.name}</p>
      <button onClick={() => deleteMember(member.id)} className="delete">
        Delete
      </button>
    </div>
  ));

  const deleteMember = (id) => {
    const input = {id: id}
    deleteMemberName({variables: { input }})
  };

  const submitMember = (event) => {
    if (currentMember.name) {
      event.preventDefault();
      const input = {name: currentMember.name, householdId: id}
      createMember({variables: { input }});
    }
  };

  const submitHouseholdName = (event) => {
    if (householdName) {
      const input = {id: id, name: householdName}
      event.preventDefault();
      setEditMode(false);
      updateHousehold({variables: { input }});
    }
  };

  return (
    <div className="edit-house">
      {queryError}|| {mutationError} || {deleteError} || {createMemberError} && <p>"Sorry there was an error, please try again later"</p>
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
