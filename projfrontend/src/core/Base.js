import React from "react";

const Base = ({ title, description, className = "p-4", children }) => {
  return (
    <div className="md:mx-auto">
      <div className="jumbotron text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Base;
