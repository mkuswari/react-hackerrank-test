import React from "react";

const Table = ({ data }) => {
  return (
    <div className="card">
      <table data-testid="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
          </tr>
        </thead>
        <tbody data-testid="tableBody">
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.country}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
