import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./AdminPage.css"

import "./Tablesnavbar.css";

export const Tablesnavbar = ({ rows, deleteRow, editRow,setRows,idx }) => {
  console.log(rows,"rows")
  return (
   <>
   <div className="Testerpage">
   </div>
   
    <div className="table-wrapper">
       {console.log("hello")}
      <table className="table">
        <thead>
          <tr>
            <th>Requirement ID</th>
            <th>Section Name</th>
            <th>Requirement </th>
            <th>Test Goal</th>
            <th>Test Case ID</th>
            <th>Pre Condition</th>
            <th className="expand">Test Description</th>
            <th>Expected Result</th>
            <th>Actions</th>
         
          </tr>
        </thead>
        <tbody>
        {console.log("row inside table",rows)}
          {rows.map((row) => {
            // const statusText =row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={row._id}>
                <td>{row.requirementID}</td>
                <td>{row.sectionName}</td>
                <td>{row.requirement}</td>
                {/* <td>{row.page}</td> */}
                <td>{row.testGoals}</td>
                <td>{row.testCaseID}</td>
                <td>{row.preCondition}</td>
                <td className="expand">{row.testDescription}</td>
                <td>{row.expectedResult}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row._id)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(row._id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
};
