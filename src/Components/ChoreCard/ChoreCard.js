import './ChoreCard.css';

const ChoreCard = ({member, chore, duration}) => {
  return (
    <div className='chore-card' style={{'backgroundColor':`#${Math.floor(Math.random()*16777215).toString(16)}`}}>
      <h3>{member}'s Chore:</h3>
      <h2>{chore}</h2>
      <p>{duration} minutes</p>
    </div>
  );
}

export default ChoreCard;