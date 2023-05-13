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
            <form className='house-form'>
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
                        value={memberNum}
                        onChange={(e) => changeNumOfInputs(e.target.value)}
                    />
                </label>
                {createMemberInputs}
                <button onClick={(event) => {
                    event.preventDefault();
                    console.log(input)
                    }}>Submit
                </button>
            </form>
            <NavLink to="/dashboard">
				<button>See Schedule</button>
			</NavLink>
        </>
    );
}

export default HouseForm;