import { useState , useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const [isSignInForm , setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null)

    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name =useRef(null);

    const handleButtonClick=()=>{
       const message = checkValidData(email.current.value , password.current.value);
       setErrorMessage(message);
       if(message) return;

       if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
  displayName: name.current.value ,
}).then(() => {
  const {uid,email,displayName} = auth.currentUser;
  dispatch(
    addUser({
      uid:uid,
      email:email,
      displayName:displayName,
    
    })
  )

}).catch((error) => {
  setErrorMessage(error.message)
});
    console.log(user);
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
   
  });

       }
        else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });
        

       };

       

    }

const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);

    };
return (
    <div > 
        <Header/>
        <div className="absolute">
        <img src ="IN-en-20250428-TRIFECTA-perspective_e045264e-b4d4-4a6f-b2cc-f95e3344a332_large.jpg" alt="bg"/>
    </div>
    <form onSubmit={(e)=>e.preventDefault()}className="w-3/12 absolute p-10 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
    <h1 className="font-bold text-3xl py-4">{isSignInForm?"Sign In" : "Sign Up"}</h1>
     {!isSignInForm && ( <input ref={name} type ="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-600"/>)}
        <input  ref={email} type = "text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600"/>
    
        <input ref ={password} type ="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-600"/>
        <p className="text-red-700 font-bold text-lg">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-600 w-full rounded-lg "onClick={handleButtonClick}>{isSignInForm?"Sign In" : "Sign Up"}</button>
        <p className="py-3 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm?"New to Netflix? Sign Up Now. " : "Already Registered? Sign In Now."}</p>
    </form>
    </div>
  )
};
export default Login;