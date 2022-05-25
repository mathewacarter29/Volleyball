import "./Dropdown.css";

function Dropdown(props) {
  const options = props.options.map((optionName, index) => {
    return <option key={index}>{optionName}</option>;
  });

  return (
    <div className="dropdown">
      <select onChange={props.onChange}>{options}</select>
    </div>
  );
}

export default Dropdown;
