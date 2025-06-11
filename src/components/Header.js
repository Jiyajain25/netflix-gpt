import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate=useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigate("/");
  
}).catch((error) => {
  navigate("/error");
});


  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between" >
        <img className="w-40" src ="Netflix_Logo_PMS.png" alt="logo"/>
       {user && (
         <div className="flex p-3">
          <img className="w-12 h-12 " alt="usericon" src="netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"/>
          <button onClick={(handleSignOut)} className="font-bold text-white">Sign Out</button>
        </div>
       )}
    </div>
  );
};

export default Header;