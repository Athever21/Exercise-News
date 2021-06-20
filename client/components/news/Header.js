import React from "react";
import { useNews } from "../../NewProvider";
import { countries } from "../../config/filtersValues";
import "./News.scss";

const Header = () => {
  const { newsFilters } = useNews();

  return (
    <header>
      <h2>
        Displayed {newsFilters.perPage} newest news from:{" "}
        {
          countries.find((country) => country.value === newsFilters.country)
            .name
        }
      </h2>
      <hr />
    </header>
  );
};

export default Header;
