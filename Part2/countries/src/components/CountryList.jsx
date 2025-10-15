import { useState } from "react";

import Country from "./Country";

const CountryList = ({ props }) => {
  const [isVisible, setIsVisible] = useState(
    props.map((country) => {
      return {
        countryName: country?.name?.common,
        visibility: false,
      };
    })
  );
  const showCountryDetails = (name) => {
    setIsVisible(
      isVisible.map((country) => {
        if (country.countryName === name) {
          return {
            countryName: country.countryName,
            visibility: !country.visibility,
          };
        } else {
          return {
            countryName: country.countryName,
            visibility: country.visibility,
          };
        }
      })
    );
  };
  return (
    <>
      <ul>
        {props.map((country) => {
          return (
            <li key={country?.name?.common}>
              {country?.name?.common}{" "}
              <button onClick={() => showCountryDetails(country?.name?.common)}>
                show
              </button>
              {isVisible.find((ctr) => {
                if (ctr.countryName === country?.name?.common) {
                  return ctr.visibility;
                }
              }) && <Country props={country} />}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CountryList;
