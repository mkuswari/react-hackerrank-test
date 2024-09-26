import React, { useState } from "react";
import "./App.css";
import "h8k-components";
import info from "./info.json";
import { Pagination } from "./components";

const title = "React Pagination";

const App = () => {
  const [data] = useState([...info]);

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center mt-20">
        <div className="w-45 mr-75">
          <Pagination data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
