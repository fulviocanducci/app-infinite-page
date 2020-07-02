import React, { useEffect, useRef, useState } from "react";
import { url, formatDateTime } from "./Utils";
import Card from "./Card";
import End from "./End";
import Loading from "./Loading";

function Observer() {
  const target = useRef();

  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(null);

  const intersectionObserver = new IntersectionObserver((o) =>
    setScrollRatio(o[0].intersectionRatio)
  );

  const loadingData = () => {
    const newPage = page + 1;
    fetch(url(newPage))
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            setItems([...items, ...response.data]);
            setHasNextPage(newPage < response.last_page);
            setPage(newPage);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    intersectionObserver.observe(target.current);
    return () => {
      intersectionObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasNextPage && scrollRatio) {
      setLoading(true);
      setTimeout(() => {
        loadingData();
      }, 500);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRatio]);

  return (
    <>
      <div className="container">
        {items.map((item, indice) => (
          <Card
            key={indice}
            id={item.id}
            name={item.name}
            created={formatDateTime(item.created_at)}
          />
        ))}
        <div style={{ height: 60 }}>
          <div ref={target}></div>
          {loading && <Loading />}
          {hasNextPage === false && <End />}
        </div>
      </div>
    </>
  );
}

export default Observer;
