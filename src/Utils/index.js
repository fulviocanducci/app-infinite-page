import React from "react";
import Moment from "react-moment";

export function formatDateTime(dateTime) {
  return <Moment format="DD/MM/YYYY HH:mm:ss">{dateTime}</Moment>;
}
