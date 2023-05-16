import './HouseForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function HouseForm() {

  const [input, setInput] = useState({
    houseName: '',
    membersNames: {},
    membersInputs: ['newInput']
  });
  const [memberNum, setMemberNum] = useState(1);

  const changeMemberName = (key, value) => {
    setInput({...input, membersNames:{...input.membersNames, [key]: value}});
  }

  const changeNumOfInputs = (num) => {
    if(num > memberNum) {
      setInput({...input, membersInputs: [...input.membersInputs, 'newInput']});
    } else {
      const reducedArray = input.membersInputs.slice(0, -1);
      setInput({...input, membersInputs: reducedArray});
    }
    setMemberNum(num);
  }

  const checkValidity = () => {
    const keys = Object.keys(input.membersNames);
    return keys.length < input.membersInputs.length ? false : true;
  }

  const submitForm = (event) => {
    const check = checkValidity()
    if(input.houseName && check) {
      event.preventDefault();
      const data = {
        name: input.houseName,
        members: input.membersNames
      }
      console.log(data);
      clearForm();
    } 
  }

  const clearForm = () => {
    setInput({
      houseName: '',
      membersNames: {},
      membersInputs: ['newInput']
    });
    setMemberNum(1);
    // There is a bug where the first input field to enter a household members name isn't clearing
  }

  const memberInputs = input.membersInputs.map((member, index) => 
    <input 
      className='mem-input'
      key={index}
      type='text'
      name={`memberName${index}`}
      placeholder='Name of Chore-Doer'
      onChange={(e) => changeMemberName(e.target.name, e.target.value)}
      required
    />
  )

  return (
    <div className='edit-house'>
      <h1>Edit your Household!</h1>
      <form className='house-form'>
        <input 
          type='text'
          name='householdName'
          placeholder='Name Your Household'
          value={input.houseName}
          onChange={(e) => setInput({...input, houseName: e.target.value})}
          required
        />
        <label>
          How many chore-doers are there?
          <input
            className='num-members'
            type='number'
            step='1'
            min='1'
            max='10'
            value={memberNum}
            onChange={(e) => changeNumOfInputs(e.target.value)}
            required
            />
          </label>
          {memberInputs}
          <button className='house-btn' onClick={submitForm}>Submit</button>
      </form>
      <NavLink to="/dashboard">
        <button className='house-btn'>See Schedule</button>
      </NavLink>
    </div>
  );
}

export default HouseForm;