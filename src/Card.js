import React from "react";

export default function Card({ id, name, created }) {
  return (
    <div className="card mt-3 mb-3">
      <div className="card-body">
        <h5 className="card-title">
          {id} - {name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{created}</h6>
      </div>
    </div>
  );
}
