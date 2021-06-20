import React, { useEffect, useState } from "react";
import { useNews, useNewsControl } from "../../NewProvider";

const Pages = () => {
  const {pages} = useNews();
  const {goToPage} = useNewsControl();
  const [array,setArray] = useState([]);

  useEffect(() => {
    let arr = [];
    for(let i = 1; i < pages; i++) {
      arr.push(i);
    }
    setArray(arr);
  },[pages])

  if (!pages) return "";

  return(
    <div className="goto-container">
      {array.map((n) => {
        return <div onClick={() => goToPage(n)} key={n}>{n}</div>
      })}
    </div>
  )
}

export default Pages;