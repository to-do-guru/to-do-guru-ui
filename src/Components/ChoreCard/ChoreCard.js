import './ChoreCard.css';

const ChoreCard = ({member, chore, duration}) => {
    return (
        <div className='chore-card'>
            <h3>{member}'s Chore:</h3>
            <h2>{chore}</h2>
            <p>{duration} minutes</p>
        </div>
    );
}

export default ChoreCard;