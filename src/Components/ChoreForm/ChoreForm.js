import './ChoreForm.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function ChoreForm() {

    const [chores, setChores] = useState([
        'Wash Dishes',
        'Laundry',
        'Sweep Floor'
    ])

    const choreItems = chores.map((chore, index) => <li key={index}>{chore}</li>)

    return (
        <>
            <h1>Edit your Chores!</h1>

            <aside className='chore-list'>
                <ol>
                    {choreItems}
                </ol>
            </aside>

            <NavLink to="/dashboard">
				<button>View Schedule</button>
			</NavLink>
        </>
    );
}

export default ChoreForm;