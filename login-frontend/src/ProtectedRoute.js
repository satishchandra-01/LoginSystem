import React from "react";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ component: Component, user, requiredRoles, userRole, isLoginChecked }) {
  return (!isLoginChecked ? <p>Loading...</p> :
    user ?
      requiredRoles.includes(userRole) ?
        <div>
          <Component role={userRole}
            uid={user.uid}
          />
        </div>
        : <Navigate to="/login" />
      : <Navigate to="/login" />
  );
}

export default ProtectedRoute;
