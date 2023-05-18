import './ChoreForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';

const ChoreForm = ({id, email}) => {

  const [chores, setChores] = useState([
    'Wash Dishes',
    'Laundry',
    'Sweep Floor'
  ]);

  const [input, setInput] = useState({
    choreName: '',
    choreDuration: 15
  });
  const [choreDays, setChoreDays] = useState(null);

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
    const num = input.choreDuration;
    if(num % 15 === 0 && num > 14 && num < 241) {
      return true;
    } else {
      return false;
    }
  }

  const submitForm = (event) => {
    const check = checkValidity();
    if(input.choreName && choreDays && check) {
      event.preventDefault();
      setChores([...chores, input.choreName]);
      const data = {
        name: input.choreName,
        duration: input.choreDuration,
        days: choreDays.map(chore => chore.value)
      }
      console.log(data);
      clearForm();
    }
  }

  const clearForm = () => {
    setInput({
      choreName: '',
      choreDuration: 15
    });
    setChoreDays(null);
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
              value={input.choreName}
              onChange={(e) => setInput({...input, choreName: e.target.value})}
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
              value={input.choreDuration}
              onChange={(e) => setInput({...input, choreDuration: e.target.value})}
            />
            <button className='chore-btn' onClick={submitForm}>Add Chore!</button>
        </form>
        <aside className='chore-list'>
          <h2>Your Chores:</h2>
          <ol>
            {choreItems}
          </ol>
        </aside>
      </div>
      <NavLink to="/dashboard">
        <button className='house-btn'>View Schedule</button>
      </NavLink>
    </div>
  );
}

export default ChoreForm;