import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={location.pathname}/>;
  }
    

    return children;
};

export default PrivateRoute;