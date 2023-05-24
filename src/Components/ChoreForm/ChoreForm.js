import './ChoreForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import { GET_CHORE_INFO, ADD_CHORE, RANDOMIZE_CHORES } from '../../queries';
import { useQuery, useMutation } from "@apollo/client";

const ChoreForm = ({ email }) => {

  const [chores, setChores] = useState([]);

  const [choreInput, setChoreInput] = useState({
    choreName: '',
    choreDuration: 15
  });
  const [choreDays, setChoreDays] = useState(null);
  const [id, setId] = useState('');

  const { data: choreData, error: choreError, loading } = useQuery(GET_CHORE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (choreData) => {
      setId(choreData.household.id)
      cleanChores(choreData.household.chores)
    },
    variables: { email },
  });

  const [addChore, { data: addChoreData, error: addChoreError }] = useMutation(ADD_CHORE, {
    fetchPolicy: "no-cache",
    onCompleted: (addChoreData) => {
      setChores([...chores, addChoreData.createChore.chores[0].choreName]);
      randomizeChores();
      clearForm();
    }
  });
  const [randomizeChoresMutation] = useMutation(RANDOMIZE_CHORES, {
    fetchPolicy: "no-cache"
  });

  const randomizeChores = () => {
    const input = {id: choreData.household.id };
    randomizeChoresMutation({ variables: {input} });
  }

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

  if(choreError || addChoreError) {
    return <p className='error'> "Sorry there was an error, please try again later" </p>
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
          <label htmlFor='editChore'>
            Chore Name:
          </label>
            <input 
              className='edit-chore'
              id='editChore'
              type='text'
              value={choreInput.choreName}
              onChange={(e) => setChoreInput({...choreInput, choreName: e.target.value})}
              required
            />
          <label htmlFor='react-select-2-input'>
            Days of the week for this chore:
          </label>
            <Select
              isMulti
              options={daysOfTheWeek}
              value={choreDays}
              onChange={setChoreDays}
              required
              classNames={{
                control: () => 'select-control', 
                valueContainer: () => 'select-value-container', 
                indicatorsContainer: () => 'select-indicators-container',
                input: () => 'select-input',
              }}
            />
          <label htmlFor='choreMins'>
            Amount of time this chore takes in minutes:
          </label>
            <input 
              className='edit-chore'
              id='choreMins'
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