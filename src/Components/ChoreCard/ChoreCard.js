import './ChoreCard.css';

const ChoreCard = ({member, chore, duration}) => {
    return (
        <div className='chore-card'>
            <h1>I AM A ChoreCard</h1>
            <h2>{member}</h2>
            <p>{chore}</p>
            <p>{duration}</p>
        </div>
    );
}

export default ChoreCard;