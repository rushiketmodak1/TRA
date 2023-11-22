import { useEffect, useState } from "react";
import { ENDPOINTS } from '../../endpoints/endpoints';
import "./Modal.css";
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../App';
import axios from "axios";
import {  useContext } from "react";
// import { response } from "../../../../../Backend/Routes/apiRoutes";
import { toast, ToastContainer } from 'react-toastify';


export const Modal = ({ closeModal, onSubmit, defaultValue, rows, setRows }) => {

  console.log("rows", rows)
  const navigate=useNavigate()
  const { state, dispatch } = useContext(Usercontext);
  const [header, setHeader] = useState({});
  
  const [formState, setFormState] = useState(
    defaultValue || {
      RequirementID: "",
      SectionName: "",
      Requirement: "",
      TestGoal: "",
      TestCaseID: "",
      PreCondition: "",
      description: "",
      ExpectedResult: "",
    }
  );
  const [errors, setErrors] = useState("");
  
  const user=JSON.parse(localStorage.getItem('user'))
    console.log("USer",user)
    const token=localStorage.getItem("token")
    console.log("Token::",token);


  useEffect(()=>{
    
    // let headers;
    // if(user.role==='admin'){
    //      headers = {
    //         Authorization: `Bearer ${token}`,
    //       };
    //      setHeader(headers)
    // }
    },[])


  const validateForm = () => {
    if (formState.RequirementID &&
      formState.SectionName && formState.Requirement && formState.TestGoal && formState.TestCaseID && formState.PreCondition
      && formState.description) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // const handleChangeSection = (e) => {
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  // }

  // const handleChangeUPDID = (e) => {
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
     const data =
    {
      requirementID: parseInt(formState.RequirementID),
      sectionName: formState.SectionName,
      requirement: formState.Requirement,
      testGoals: formState.TestGoal,
      testCaseID: parseInt(formState.TestCaseID),
      preCondition: formState.PreCondition,
      testDescription: formState.description,
      expectedResult: formState.ExpectedResult,
      sprintNo:parseInt(formState.Sprintnum)
    }
    console.log("Inside Submit button:", data);
    if (!validateForm()) return;
     axios
     .post(`${ENDPOINTS}/addTestCases`,data,
     { 
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
     
    })
      .then((response) => {
       
          toast.success("Test case added successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
         
            //     else{
            // toast.error("Network Error", {
            //   position: toast.POSITION.TOP_CENTER,
            // });
        
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });

      });

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="Sprintnum">Add relase date</label>
            <input name="Sprintnum"
            input type="number"
            onChange={handleChange} value={formState.SprintNo} />
          </div>

          <div className="form-group">
            <label htmlFor="RequirementID">Tester name</label>
            <input name="RequirementID" 
            input type="number"
            onChange={handleChange} value={formState.RequirementID} />
          </div>
          <div className="form-group">
            <label htmlFor="SectionName">Sprint Name</label>
            <input name="SectionName" onChange={handleChange} value={formState.SectionName} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
