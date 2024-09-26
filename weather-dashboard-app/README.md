React-TypeScript: Weather Dashboard App

Design a Weather Dashboard app that allows users to search for weather information by city name and manage a list of favorite cities. The app should be built using TypeScript and React. Certain core React functionalities are already implemented.

The application has two components: _WeatherList_ and _WeatherCard_, where their respective functionalities will be implemented.

![](https://hrcdn.net/s3_pub/istreet-assets/z83P9E4LBfX_BBu5uqJsiA/weather-dashboard.gif)

_WeatherCard_ component should:
- Display city name, temperature, and weather description.
- Provide the ability to add or remove a city from the favorites list:
  - The button should have text value "Add to favorites" to add a city to the favorites list
  - The button should have text value "Remove from favorites" to remove a city to the favorites list

_WeatherList_ component should:
- Display a search input field to search for a city's weather information.
- Display search results with city name, temperature, and weather description.
- Allow users to switch between _Celsius_ and _Fahrenheit_ temperature units. The default temperature unit is _Celsius_.
- Enable users to add a city to their favorites list.
- Enable users to remove a city from their favorites list using the "Remove from favorites" button available in both search results and favorites table.
- Update the temperature values in both search results and favorites list when switching between _Celsius_ and _Fahrenheit_, rounding the values up to 1 decimal place.

_weatherData.ts_ type file:
- Use _weatherData_ from `src/data/weatherData.ts` file to display the weather information for all the cities. 
- The temperature data in weatherData is in Celsius.
- Use the following formula to convert Celsius temperature to Fahrenheit: 
`Fahrenheit = (Celsius * 9/5) + 32.`

The following _data-testid_ attributes are required in the components for the tests to pass:

| **Attribute**             | **Component**             |
|---------------------------|---------------------------|
| _search-input_            | Search input field        |
| _clear-search-button_     | Clear search button       |
| _unit-change-button_      | Unit change button        |
| _favorites_               | Favorites container       |
| _search-results_          | Search results container  |

Note:

- Components have data-testid attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.
- The files that should be modified by the candidate are _src/components/WeatherList/index.tsx_ and _src/components/WeatherCard/index.tsx_.

## Environment

- React Version: 18.2.0
- Node Version: 14(LTS)
- Default Port: 8000

**Read Only Files**
- `src/App.test.tsx`
- `src/data/weatherData.ts`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

