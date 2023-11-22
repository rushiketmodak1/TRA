import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Tablesnavbar.css";

export const Tablesnavbar = ({ rows, deleteRow, editRow }) => {
  return (
   
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
          {rows.map((row, idx) => {
            // const statusText =row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.RequirementID}</td>
                <td>{row.SectionName}</td>
                <td>{row.Requirement}</td>
                {/* <td>{row.page}</td> */}
                <td>{row.TestGoal}</td>
                <td>{row.TestCaseID}</td>
                <td>{row.PreCondition}</td>
                <td className="expand">{row.description}</td>
                <td>{row.ExpectedResult}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
