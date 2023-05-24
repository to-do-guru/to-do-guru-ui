import "./HouseForm.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CHANGE_HOUSE_NAME, GET_HOUSE_INFO, DELETE_MEMBER_NAME, ADD_MEMBER_NAME, RANDOMIZE_CHORES } from "../../queries";


const HouseForm = ({ email }) => {
  const [members, setMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({id:"", name:""});
  const [householdName, setHouseholdName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editMember, setEditMember] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [validName, setValidName] = useState(true);
  const [id, setId] = useState('');

  const { data: queryData, loading, error: queryError } = useQuery(GET_HOUSE_INFO, {
      fetchPolicy: "no-cache",
      onCompleted: (queryData) => {
        setMembers(queryData.household.members)
        setHouseholdName(queryData.household.name)
        setId(queryData.household.id)
    },
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
  const [randomizeChoresMutation] = useMutation(RANDOMIZE_CHORES, {
    fetchPolicy: "no-cache"
  });

  const randomizeChores = () => {
    const input = {id: queryData.household.id };
    randomizeChoresMutation({ variables: {input} });
  }

  const memberInputs = members.map((member) => (
    <div key={member.id} className="member">
      <p>{member.name}</p>
      <button onClick={() => deleteMember(member.id)} className="delete" disabled={disabled}>
        Delete
      </button>
    </div>
  ));

  const deleteMember = (id) => {
    const input = {id: id}
    deleteMemberName({variables: { input }});
    randomizeChores();
  };

  const submitMember = (event) => {
    const check = isValidName();
    if (currentMember.name && check) {
      event.preventDefault();
      const input = {name: currentMember.name, householdId: id}
      createMember({variables: { input }});
      randomizeChores();
    }
    if (currentMember.name && !check) {
      event.preventDefault();
    }
  };

  const isValidName = () => {
    const names = members.map(member => member.name.toLowerCase());
    if(names.includes(currentMember.name.toLowerCase())) {
      setValidName(false);
      return false;
    } else {
      setValidName(true);
      return true;
    }
  }

  const submitHouseholdName = (event) => {
    if (householdName) {
      const input = {id: id, name: householdName}
      event.preventDefault();
      setEditMode(false);
      updateHousehold({variables: { input }});
    }
  };

  useEffect(() => {
    if(members.length < 2) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [members]);

  if (loading) {
    return <div className="loading-broom-container">
             <img className="sweeping-gif" src={require("../../images/sweeping-broom.gif")} alt="broom sweeping while loading"/>
             <h2 className="loading-msg">Loading...</h2>
           </div>
  }

  if(queryError || mutationError || deleteError || createMemberError) {
    return  <p className="error"> "Sorry there was an error, please try again later" </p>
  }
  
  return (
    <div className="edit-house">
      <h1>Edit your Household!</h1>
      <div className="house-form">
        {!editMode && (
          <div className="household-input">
            <h2>{householdName}</h2>
            <button onClick={() => setEditMode(true)}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        )}
        {editMode && (
          <form className="edit-household-name">
            <input
              type="text"
              id='householdName'
              name="householdName"
              placeholder="Name Your Household"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              required
            />
            <label htmlFor='householdName'>
              <button
                type="submit"
                onClick={(event) => submitHouseholdName(event)}
                className="submit-name"
              >
                Submit Name
              </button>
            </label>
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
              id='memberInput'
              placeholder="Name of chore-doer"
              onChange={(e) =>
                setCurrentMember({
                  name: e.target.value,
                })
              }
              required
            />
            <label htmlFor='memberInput'>
              <button
                className="submit-member"
                type="submit"
                onClick={(event) => submitMember(event)}
              >
                Submit
              </button>
            </label>
          </form>
        )}
        {!validName && <p>Please enter a unique name!</p>}
      </div>
      <NavLink to="/dashboard">
        <button className="house-btn">See Schedule</button>
      </NavLink>
    </div>
  );
};

export default HouseForm;
