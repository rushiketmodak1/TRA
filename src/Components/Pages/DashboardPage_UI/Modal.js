import React, { useState } from "react";

import "./Modal.css";
import axios from "axios";
// import { response } from "../../../../../Backend/Routes/apiRoutes";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      SectionID: "",
      UP3DID: "",
      RequirementID: "",
      SectionName: "",
      RequirementName: "",
      // page: "",
      TestGoal: "",
      TestCaseID: "",
      PreCondition: "",
      ExpectedResult: "",
      ActualResult: "",
      status: "live",
      Issues: "",
      Result: "",
      TestersName: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.SectionID && formState.UP3DID && formState.RequirementID &&
      formState.SectionName && formState.RequirementName && formState.TestGoal && formState.TestCaseID && formState.PreCondition
      && formState.description && formState.ExpectedResult
      && formState.ActualResult && formState.status && formState.Issues &&
      formState.Result && formState.TestersName) {
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
    const data={
       RequirementID: "123",
       SectionName:"Home",
       Requirement:"Need to accept character only",
       TestGoal: "Need to check text field",
       TestCaseID:"UP3D1",
       PreCondition:"Allowed character only",
       description:"This test case is for checking text field",
       ExpectedResult: "Only Character allowed",
    }
console.log("Inside Submit button:",data);
    // if (!validateForm()) return;
     axios.post("http://localhost:5000/api/TestCases/AddnewTestCases",data)
     .then((response)=>console.log("response",response))
     .catch((err)=>console.log("err",err));

    onSubmit(formState);

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
            <label htmlFor="page">Requirement ID</label>
            <input name="page" onChange={handleChange} value={formState.RequirementID} />
          </div>
          <div className="form-group">
            <label htmlFor="page">Section Name</label>
            <input name="page" onChange={handleChange} value={formState.SectionName} />
          </div>
          <div className="form-group">
            <label htmlFor="page">Requirement</label>
            <input name="page" onChange={handleChange} value={formState.RequirementName} />
          </div>
          <div className="form-group">
            <label htmlFor="page">Test Goal</label>
            <input name="page" onChange={handleChange} value={formState.TestGoal} />
          </div>
          <div className="form-group">
            <label htmlFor="page">Test Case ID</label>
            <input name="page" onChange={handleChange} value={formState.TestCaseID} />
          </div>
          <div className="form-group">
            <label htmlFor="page">Pre Condition</label>
            <input name="page" onChange={handleChange} value={formState.PreCondition} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Test Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
         
       
          <div className="form-group">
            <label htmlFor="page">ExpectedResult</label>
            <input name="page" onChange={handleChange} value={formState.ExpectedResult} />
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
