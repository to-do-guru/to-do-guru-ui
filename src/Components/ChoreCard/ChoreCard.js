import './ChoreCard.css';

const ChoreCard = ({member, allMembers, chore, duration}) => {
  return (
    <div className='chore-card' tabIndex="0" style={{'backgroundColor':allMembers.find(singleMember => singleMember.name === member).color}}>
      <h1>{member}'s Chore:</h1>
      <h2>{chore}</h2>
      <p>{duration} minutes</p>
    </div>
  );
}

export default ChoreCard;