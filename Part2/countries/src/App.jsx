import { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";
import CountryList from "./components/CountryList";

function App() {
  const [countryName, setCountryName] = useState("");
  const [allCountries, setAllCountries] = useState(null);
  const [content, setContent] = useState("");
  const onCountryNameChange = (event) => {
    const name = event.target.value;
    setCountryName(name);
    const selected = allCountries?.filter((country) => {
      return country?.name?.common
        ?.toLowerCase()
        ?.startsWith(name.toLowerCase());
    });
    if (selected) {
      if (selected.length > 10) {
        setContent(<div>Too many matches. Specify another filter.</div>);
      } else if (selected.length <= 10 && selected.length > 1) {
        setContent(<CountryList props={selected} />);
      } else {
        setContent(<Country props={selected[0]} />);
      }
    } else {
      setContent(<div>Error occurred while loading country data.</div>);
    }
  };
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);
  return (
    <>
      find countries{" "}
      <input value={countryName} onChange={onCountryNameChange} />
      {content}
    </>
  );
}

export default App;
