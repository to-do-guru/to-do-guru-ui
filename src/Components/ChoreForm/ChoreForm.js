import './ChoreForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';

function ChoreForm() {

    const [chores, setChores] = useState([
        'Wash Dishes',
        'Laundry',
        'Sweep Floor'
    ])

    const daysOfTheWeek = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
    ]

    const choreItems = chores.map((chore, index) => <li key={index}>{chore}</li>)

    return (
        <>
            <h1>Edit your Chores!</h1>
            <div className='chore-form-container'>
                <form className='chore-form'>
                    <label>
                        Chore Name:
                        <input 
                            type='text'
                        />
                    </label>
                    <label>
                        Days of the week for this chore:
                        <Select
                            isMulti 
                            options={daysOfTheWeek}
                        />
                    </label>
                    <label>
                        Amount of time this chore takes in minutes:
                        <input 
                            type='number'
                            step='15'
                            min='15'
                            max='240'
                        />
                    </label>
                    <button onClick={(event) => {
                        event.preventDefault();
                        console.log('new chore!');
                        }}>Add Chore!
                    </button>
                </form>
                <aside className='chore-list'>
                    <h2>Your Chores:</h2>
                    <ol>
                        {choreItems}
                    </ol>
                </aside>
            </div>
            <NavLink to="/dashboard">
				<button>View Schedule</button>
			</NavLink>
        </>
    );
}

export default ChoreForm;