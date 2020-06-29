import React, { useState, useEffect } from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import Card from "./Card";
import Loading from "./Loading";
import End from "./End";

import { formatDateTime } from "./Utils";

function App() {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(
    () => {
      loadItemsAsync();
    }, // eslint-disable-next-line
    []
  );

  async function loadItemsAsync() {
    try {
      setLoading(true);
      setTimeout(async () => {
        const newPage = page + 1;
        setPage(newPage);
        const response = await fetch(
          `http://localhost:8000/api/peoples/page?page=${newPage}`
        );
        const json = await response.json();
        setItems([...items, ...json.data]);
        setHasNextPage(newPage < json.last_page);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadItemsAsync,
    scrollContainer: "window",
  });

  return (
    <div className="container" ref={infiniteRef}>
      {items.map((item, indice) => (
        <Card
          key={indice}
          id={item.id}
          name={item.name}
          created={formatDateTime(item.created_at)}
        />
      ))}
      {loading && <Loading />}
      {hasNextPage === false && <End />}
    </div>
  );
}

export default App;
