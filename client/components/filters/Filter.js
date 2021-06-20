import React from "react";
import { useNewsControl, useNews } from "../../NewProvider";
import {countries, pageSizes} from "../../config/filtersValues";
import "./Filter.scss";

const Filter = () => {
  const { changeCountry, changePerPage } = useNewsControl();
  const { newsFilters } = useNews();

  const selectCountry = ({ target }) => changeCountry(target.value);
  const selectPageSize = ({ target }) => changePerPage(target.value);

  return (
    <div className="filter-container">
      <Select
        values={countries}
        changeFunc={selectCountry}
        initial={newsFilters.country}
        labelText="Country: "
        id="countries"
      />
      <Select
        values={pageSizes}
        changeFunc={selectPageSize}
        initial={newsFilters.perPage}
        labelText="News on page: "
        id="page-sizes"
      />
    </div>
  );
};

const Select = ({ values, changeFunc, initial, labelText, id }) => (
  <div id={id}>
    <label>{labelText}</label>
    <select onChange={changeFunc} defaultValue={initial}>
      {values.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name ? option.name : option.value}
          </option>
        );
      })}
    </select>
  </div>
);

export default Filter;
