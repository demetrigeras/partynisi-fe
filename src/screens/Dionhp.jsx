import Nav from "../components/Nav"
import { useNavigate, useParams } from "react-router-dom";

const Dionhp = ({user}) => {

const navigate = useNavigate();
const id = useParams();
console.log(id);




    return (
        <div>
            <Nav user={user} />
            <div className="dion-screen">
           Welcome to Dion!
        </div>
        <div className="dion-description">
           <h2>Dion is Party Scheduling app where you can create events and request to be apart of events</h2> 
            <h3>Click on the create event button to Create Event on your Profile</h3>
            <button className="create-event" onClick={() => navigate('/profile')}>Create Event </button>
           
            <div className="Allusers">
                <strong>See all other users displayed below.</strong>
            </div>
        </div>
        
        </div>
    )
}

export default Dionhp;