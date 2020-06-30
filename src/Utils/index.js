import React from "react";
import Moment from "react-moment";

export function formatDateTime(dateTime) {
  return <Moment format="DD/MM/YYYY HH:mm:ss">{dateTime}</Moment>;
}

export function url(newPage) {
  return `http://localhost:8000/api/peoples/page?page=${newPage}`;
}
