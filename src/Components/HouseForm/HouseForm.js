import './HouseForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function HouseForm() {

    const [input, setInput] = useState({
        houseName: '',
        members: []
    })

    return (
        <>
            <h1>Edit your Household!</h1>
            <input 
                type='text'
                name='householdName'
                placeholder='Name Your Household'
                value={input.houseName}
            />
            <NavLink to="/dashboard">
				<button>See Schedule</button>
			</NavLink>
        </>
    );
}

export default HouseForm;