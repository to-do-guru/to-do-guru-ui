import './HouseForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function HouseForm() {

    const [input, setInput] = useState({
        houseName: '',
        membersNames: {},
        membersInputs: []
    });

    const changeMemberName = (key, value) => {
        setInput({...input, membersNames:{...input.membersNames, [key]: value}});
    }

    const createMemberInputs = input.membersInputs.map((member, index) => 
        <input 
            key={index}
            type='text'
            name={`memberName${index}`}
            placeholder='Name of Chore-Doer'
            onChange={(e) => changeMemberName(e.target.name, e.target.value)}
        />
    )

    return (
        <>
            <h1>Edit your Household!</h1>
            <form>
                <input 
                    type='text'
                    name='householdName'
                    placeholder='Name Your Household'
                    value={input.houseName}
                    onChange={(e) => setInput({...input, houseName: e.target.value})}
                />
                <label>
                    How many chore-doers are there?
                    <input
                        type='number'
                        step='1'
                        min='1'
                        max='10'
                        value={input.membersInputs.length}
                        onChange={() => setInput({...input, membersInputs: [...input.membersInputs, 'newInput']})}
                    />
                </label>
                {createMemberInputs}
                <button onClick={(event) => {
                    event.preventDefault();
                    console.log(input)}}>Submit</button>
            </form>
            <NavLink to="/dashboard">
				<button>See Schedule</button>
			</NavLink>
        </>
    );
}

export default HouseForm;