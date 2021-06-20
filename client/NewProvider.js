import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const NewsContext = React.createContext();
const NewsControlContext = React.createContext();

export const useNews = () => useContext(NewsContext);
export const useNewsControl = () => useContext(NewsControlContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [newsFilters, setNewsFilters] = useState({
    country: "pl",
    perPage: 10,
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [init, setInit] = useState(true);

  const fetchNews = async (numPage = 0) => {
    setNews([]);
    setPages(0);
    try {
      const { country, perPage } = newsFilters;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${perPage}&page=${
        numPage ? numPage : page
      }&apiKey=1aee5cf2ad424df594728402637b38d3`;
      const { data } = await axios.get(url);
      console.log(data);
      setPages(Math.ceil(data.totalResults / newsFilters.perPage));
      setNews(data.articles);
    } catch (err) {
      console.log(err.response);
    }
  };

  const changeCountry = (newCountry) => {
    let filters = { country: newCountry, perPage: newsFilters.perPage };
    localStorage.setItem("newsFilters", JSON.stringify(filters));
    setNewsFilters(filters);
    setPage(1);
  };

  const changePerPage = (size) => {
    let filters = { country: newsFilters.country, perPage: size };
    localStorage.setItem("newsFilters", JSON.stringify(filters));
    setNewsFilters(filters);
    setPage(1);
  };

  const goToPage = (n) => {
    setPage(n);
    fetchNews(n);
  };

  useEffect(() => {
    let filters = localStorage.getItem("newsFilters");
    if (filters) setNewsFilters(JSON.parse(filters));
    setInit(false);
  }, []);

  useEffect(() => {
    if (!init) {
      (async () => {
        await fetchNews();
      })();
    }
  }, [newsFilters, init]);

  return (
    <NewsContext.Provider value={{ news, newsFilters, pages }}>
      <NewsControlContext.Provider
        value={{ changeCountry, changePerPage, goToPage }}
      >
        {children}
      </NewsControlContext.Provider>
    </NewsContext.Provider>
  );
};
