
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import AdminPanel from "./Components/Admin/AdminPanel";
import { Footer } from "./Components/Footer/Footer";
import FunHeader from "./Components/Header/FunHeader";
import Home from "./Components/Home/Home";
import Services from "./Components/Services/Services";
import BedAndBlood from "./Components/BedandBlood/BedAndBlood";
import LoginForm from "./Components/LoginSignUp/LoginPage";
import SignupPage from "./Components/LoginSignUp/SignupPage";
import AmbulanceService from "./Components/Ambulance/AmbulanceService";
import UpdateServices from "./Components/Admin/UpdateServices";
import RatingPage from "./Components/Rating/RatingPage";
import BookAppointment from "./Components/BookAppointment/BookAppointment";
import InitialServices from './Json/services.json';
import { createContext, useReducer, useState } from "react";
import {initialState,reducer} from './UseReducer/useReducer'

export const UserContext = createContext();

const cors=require('cors')




function App() {
  const [allservices,setServices] = useState(InitialServices);
  const [bedInfo , setBedInfo] = useState('');

  const [ambCount , setAmbCount] = useState('');

  const AmbCountSaveHandler = (ambCount)=>{
    setAmbCount(ambCount);
  }

  const BedInfoSaveHandler = (bedInfo)=>{
    setBedInfo(bedInfo)
  }
  
  const ServiceSaveHandler = (service)=>{
    setServices((prevState)=>{
      return [service,...prevState]
    });

    

  };
  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <div className="App">
    <BrowserRouter>
    
    <UserContext.Provider value={{state,dispatch}}>
    
    <FunHeader/>
    <Routes>
      <Route path="/home" element = {<Home/>}/>
      // <Route path="/Services" element = {<Services items={allservices}/>}/>
      <Route path="/Services"/>
      <Route path="/adminpanel" element = {<AdminPanel onSaveAmbCount={AmbCountSaveHandler}/>}/>
      <Route path="/bed&blood" element = {<BedAndBlood items ={bedInfo}/>}/>
      <Route path="/login" element = {<LoginForm />}/>
      <Route path="/signup" element = {<SignupPage/>}/>
      <Route path="/ambulanceservice" element = {<AmbulanceService count = {ambCount}/>}/>
      <Route path="/serviceupdate" element = {<UpdateServices onSaveService={ServiceSaveHandler}/>}/>
      <Route path="/bookappointment" element = {<BookAppointment/>}/>
      <Route path="/*" element = {<Navigate to ="/home"/>}/>

    </Routes>
    </UserContext.Provider>
  </BrowserRouter>
   <Footer></Footer>
   </div>
  );
}

export default App;

