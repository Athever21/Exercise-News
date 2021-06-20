import React from "react";
import Loading from "../loading/Loading";
import { useNews } from "../../NewProvider";

const News = () => {
  const { news } = useNews();

  if(!news.length) return <><Loading /></>;

  return (
    <main>
      {news.map((x, i) => (
        <SingleNews key={i} singleNews={x}></SingleNews>
      ))}
    </main>
  );
};

const SingleNews = ({ singleNews }) => {
  return (
    <div className="news-container">
      <a href={singleNews.url} target="_blank"></a>
      <img src={singleNews.urlToImage} />
      <div className="news-info">
        <h3>{singleNews.title}</h3>
        <div className="date">
          {singleNews.publishedAt.split("T").map((t, i) => {
            return <p key={i}>{i == 1 ? t.substring(0,t.length-1) : t}</p>;
          })}
        </div>
        <p className="desc">{cutString(singleNews.description)}</p>
      </div>
    </div>
  );
};

function cutString(string) {
  if(!string) return "";

  for(let i = 60; i > 0; i--) {
    if (string[i] === " ") {
      return `${string.substring(0,i)}...`;
    }
  }
}

export default News;
