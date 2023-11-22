
import './App.css';
import { Route, Routes,useNavigate ,useRoutes} from 'react-router-dom';
import { renderRoute } from './Components/Renderroute';
import axios from 'axios';
import { routes } from './routes';
import { createContext, useContext, useEffect, useReducer,useState } from "react";
import { initialState, reducer } from "./reducers/useReducer"
export const Usercontext = createContext();
function App() {
  const [role,setRole]=useState("")
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
    setRole(user.role)
    }
    if (!user && currentPath !== "/signup") {
      navigate("/signin");
    }
    dispatch({type:"USER",payload:user})
  }, [navigate]);
  
  return (

    <>

      <Usercontext.Provider value={{ state, dispatch }}>
      <Routes>
      {routes.map((route) => renderRoute(route, role))}
    </Routes>
        </Usercontext.Provider>
    </>
  );

 
}

export default App;
