import './HouseForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function HouseForm() {

    const [input, setInput] = useState({
        houseName: '',
        membersNames: [],
        membersInputs: []
    });

    const changeName = (name) => {
        setInput({...input, houseName: name});
    }

    const createMemberInputs = input.membersInputs.map((member, index) => 
        <input 
            key={index}
            type='text'
            name={`memberName${index}`}
            placeholder='Name of Chore-Doer'
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
                    onChange={(e) => changeName(e.target.value)}
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
            </form>
            <NavLink to="/dashboard">
				<button>See Schedule</button>
			</NavLink>
        </>
    );
}

export default HouseForm;