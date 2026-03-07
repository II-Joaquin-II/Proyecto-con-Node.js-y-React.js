import '../stylesheets/UserCards.css';

interface Props {
  name: String;
  age: number;
}

const UserCards = ({name, age}:Props) => {
  return (
    <div className="UserCards">
      <h1 className="UserCards-tittle">{name}</h1>
      <h2 className="UserCards-subtittle">{age}</h2>
    </div>
  );
};

export default UserCards;