import './ChoreForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import { GET_CHORE_INFO, ADD_CHORE } from '../../queries';
import { useQuery, useMutation } from "@apollo/client";

const ChoreForm = ({ email }) => {

  const [chores, setChores] = useState([]);

  const [choreInput, setChoreInput] = useState({
    choreName: '',
    choreDuration: 15
  });
  const [choreDays, setChoreDays] = useState(null);
  const [id, setId] = useState('');

  const { data: choreData, loading } = useQuery(GET_CHORE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (choreData) => {
      setId(choreData.household.id)
      cleanChores(choreData.household.chores)
    },
    variables: { email },
  });

  const [addChore, { data: addChoreData }] = useMutation(ADD_CHORE, {
    fetchPolicy: "no-cache",
    onCompleted: (addChoreData) => {
      setChores([...chores, addChoreData.createChore.chores[0].choreName]);
      clearForm();
    }
  });

  const daysOfTheWeek = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' }
  ];

  const choreItems = chores.map((chore, index) => <li key={index}>{chore}</li>);

  const checkValidity = () => {
    const num = choreInput.choreDuration;
    if(num % 15 === 0 && num > 14 && num < 241) {
      return true;
    } else {
      return false;
    }
  }

  const submitForm = (event) => {
    const check = checkValidity();
    if(choreInput.choreName && choreDays && check) {
      event.preventDefault();
      const input = {
        householdId: id,
        name: choreInput.choreName,
        duration: parseInt(choreInput.choreDuration),
        day: choreDays.map(chore => chore.value)
      }
      addChore({variables: { input }});
    }
  }

  const clearForm = () => {
    setChoreInput({
      choreName: '',
      choreDuration: 15
    });
    setChoreDays(null);
  }

  const cleanChores = (chores) => {
    setChores(chores.reduce((acc, chore) => {
      if(!acc.includes(chore.choreName)) { 
        acc.push(chore.choreName);
      }
      return acc;
    }, []));
  }

  if (loading) {
    return <div className="loading-broom-container">
             <img className="sweeping-gif" src={require("../../images/sweeping-broom.gif")} alt="broom sweeping while loading"/>
             <h2 className="loading-msg">Loading...</h2>
           </div>
  } 

  return (
    <div className='chore-form-container'>
      <h1>Edit your Chores!</h1>
      <div className='chore-div'>
        <form className='chore-form'>
          <label>
            Chore Name:
          </label>
            <input 
              className='edit-chore'
              type='text'
              value={choreInput.choreName}
              onChange={(e) => setChoreInput({...choreInput, choreName: e.target.value})}
              required
            />
          <label>
            Days of the week for this chore:
          </label>
            <Select
              isMulti 
              options={daysOfTheWeek}
              value={choreDays}
              onChange={setChoreDays}
              required
            />
          <label>
            Amount of time this chore takes in minutes:
          </label>
            <input 
              className='edit-chore'
              type='number'
              step='15'
              min='15'
              max='240'
              value={choreInput.choreDuration}
              onChange={(e) => setChoreInput({...choreInput, choreDuration: e.target.value})}
            />
            <button className='chore-btn' onClick={submitForm}>Add Chore!</button>
            <NavLink to="/dashboard">
              <button className='house-btn'>View Schedule</button>
            </NavLink>
        </form>
        <aside className='chore-list'>
          <h2>Your Chores:</h2>
          <ol>
            {choreItems}
          </ol>
        </aside>
      </div>
    </div>
  );
}

export default ChoreForm;