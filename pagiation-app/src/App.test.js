import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const TEST_IDS = {
  selectInput: "selectInput",
  buttonDiv: "buttonDiv",
  tableBody: "tableBody",
  table: "table",
};

describe("React Pagination", () => {
  let getByTestId;
  let selectInput;
  let buttonDiv;
  let tableBody;
  let table;

  beforeEach(() => {
    const app = render(<App />);
    getByTestId = app.getByTestId;
    table = selectInput = getByTestId(TEST_IDS.selectInput);
    buttonDiv = getByTestId(TEST_IDS.buttonDiv);
    table = getByTestId(TEST_IDS.table);
  });

  afterEach(() => {
    cleanup();
  });

  const testDataForFive = [
    {
      country: "United Kingdom",
      city: "London",
    },
    {
      country: "Faroe Islands",
      city: "Tórshavn",
    },
    {
      country: "Sweden",
      city: "Stockholm",
    },
    {
      country: "France",
      city: "Paris",
    },
    {
      country: "Mali",
      city: "Bamako",
    },
  ];
  const testDataForTen = [
    {
      country: "Yemen",
      city: "Sanaa",
    },
    {
      country: "Romania",
      city: "Bucuresti",
    },
    {
      country: "Paraguay",
      city: "Asunción",
    },
    {
      country: "Algeria",
      city: "Alger",
    },
    {
      country: "Antigua and Barbuda",
      city: "Saint John's",
    },
    {
      country: "Bahrain",
      city: "al-Manama",
    },
    {
      country: "Slovakia",
      city: "Bratislava",
    },
    {
      country: "Singapore",
      city: "Singapore",
    },
    {
      country: "Guinea",
      city: "Conakry",
    },

    {
      country: "Ukraine",
      city: "Kyiv",
    },
  ];

  it("should initally have 10 buttons", () => {
    expect(buttonDiv.children).toHaveLength(10);
  });

  it("should have 10 buttons numbered from 1 to 10 when select value is 5", () => {
    fireEvent.change(selectInput, { target: { value: "5" } });
    buttonDiv = getByTestId(TEST_IDS.buttonDiv);
    const items = buttonDiv.children;
    expect(items).toHaveLength(10);
    for (let i = 0; i < items.length; i++) {
      expect(items[i].textContent).toEqual((i + 1).toString());
    }
  });

  it("should have 4 buttons when select value is 15", () => {
    fireEvent.change(selectInput, { target: { value: "15" } });
    buttonDiv = getByTestId(TEST_IDS.buttonDiv);
    expect(buttonDiv.children).toHaveLength(4);
  });
  it("should have the desired data on select value 5", () => {
    fireEvent.change(selectInput, { target: { value: "5" } });
    buttonDiv = getByTestId(TEST_IDS.buttonDiv);
    fireEvent.click(buttonDiv.children[1]);
    tableBody = getByTestId(TEST_IDS.tableBody);

    for (let i = 0; i < tableBody.children.length; i++) {
      expect(tableBody.children[i].children[0].textContent).toEqual(
        testDataForFive[i].country
      );
      expect(tableBody.children[i].children[1].textContent).toEqual(
        testDataForFive[i].city
      );
    }
  });
  it("should have the desired data on select value 10", () => {
    fireEvent.change(selectInput, { target: { value: "10" } });
    buttonDiv = getByTestId(TEST_IDS.buttonDiv);
    fireEvent.click(buttonDiv.children[2]);
    tableBody = getByTestId(TEST_IDS.tableBody);

    for (let i = 0; i < tableBody.children.length; i++) {
      expect(tableBody.children[i].children[0].textContent).toEqual(
        testDataForTen[i].country
      );
      expect(tableBody.children[i].children[1].textContent).toEqual(
        testDataForTen[i].city
      );
    }
  });
});
