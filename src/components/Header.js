import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { addUser,removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  const handleSignOut = () =>{
    signOut(auth).then(() => {}).catch((error) => {
  navigate("/error");
});
};

const handleGptSearchClick=()=>{
  dispatch(toggleGptSearchView());
};

const handleLanguageChange=(e)=>{
  dispatch(changeLanguage(e.target.value));

}

  useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid , email , displayName} = user;
    dispatch(addUser({uid : uid ,email  :email,displayName : displayName}));
   navigate("/browse");
   

   } else {
   dispatch(removeUser());
   navigate("/");
   
  }
});

return () => unsubscribe();
    },[]);
  return (
    <div className="absolute  top-0 left-0 w-screen px-8 py-2 z-10 flex justify-between items-center bg-gradient-to-b from-black via-black/40 to-transparent" >
        <img className="w-40" src = "Netflix_Logo_PMS.png" alt="logo"/>
       {user && (
         <div className="flex p-3">
          {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key ={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
           
          </select>)}
          <button 
          className="py-2 px-4 mx-4 my-2 bg-yellow-400 text-white rounded-lg"
          onClick={handleGptSearchClick}>{showGptSearch?"HomePage":"GPT Search"}
          </button>
          <img className="w-12 h-12 " alt="usericon" src="netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"/>
          <button onClick={(handleSignOut)} className="font-bold text-white">Sign Out</button>
        </div>
       )}
    </div>
  );
};

export default Header;