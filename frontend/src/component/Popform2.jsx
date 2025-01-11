import {React,useState,useEffect} from "react";
import "../css/popstyle.css"




 
const PopupForm2 = ({ closePopup,onSubmit }) => {
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(selectedOption)
        console.log(`handleSubmit ${selectedOption}`)
    };

    const handleChange=(e)=>{
      setSelectedOption(e.target.value);
      console.log(e.target.value)
    }

    

    useEffect(() => {
        fetch("/api/wa_id")
          .then((res) => res.json())
          .then((data) =>{ 
            setData(data);
            
          })
          .catch((err) => console.error(err));
      }, []);

 
  // Prevent click event propagation on the popup content
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };
 
  return (
    <div className="popup" onClick={closePopup}>
    <div className="popup-content" onClick={handlePopupClick}>
    <button className="close-btn" onClick={closePopup}>
            X
    </button>
    <form onSubmit={handleSubmit}>
    <label htmlFor="dropdown">Select an Option:</label>
    <select  id="dropdown" value={selectedOption} onChange={handleChange} required>
    <option value="">--Choose--</option>
    {data.map((row, index) => (
    <option value={row.templateid}>{row.templateid}</option>

    ))}
    </select>
    <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};
 
export default PopupForm2;