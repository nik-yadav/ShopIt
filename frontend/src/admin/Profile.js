import React from "react";
import { isAuthenticated } from "../auth/helper";

function Profile() {
  const {
    user: { name, email },
  } = isAuthenticated();
  return (
    <div className="card mb-4 text-center">
      <h4 className="card-header">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Name:</span> {name}
        </li>
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Email:</span> {email}
        </li>
        <li className="list-group-item">
          <span className="badge bg-danger">Admin area</span>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
