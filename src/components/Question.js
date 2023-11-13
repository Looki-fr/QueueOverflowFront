import '../App.css';

export default function Question(props) {
  return (
    <div className="questionDiv">
      <h1>{props.question}</h1>
      <p>{props.description}</p>
      <div className="questionDescription">
        <p className="tag">{props.tag}</p>
        <p>{props.user}</p>
        <p>{props.date}</p>
       </div>
    </div>
  );
}