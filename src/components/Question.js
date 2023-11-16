import '../App.css';

export default function Question(props) {
  let des = props.description;
  if (props.description.length > 100) {
    des = props.description.substring(0, 100) + "...";
  }
  return (
      <div className="questionDiv">
        <h1>{props.question}</h1>
        <p className="questionDescription">{des}</p>
        <div className="questionTagDiv">
          <p className="tag">{props.tag}</p>
          <p>{props.user}</p>
          <p>{props.date}</p>
        </div>
      </div>
  );
}