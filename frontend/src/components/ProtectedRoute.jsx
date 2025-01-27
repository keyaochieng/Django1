//wrapper for protective route
//if we wrap something in protective route then you need to have an authorizations token before you can actually access this route

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    //we need to check if you are authorized before you can access this route...if not you'l be told to log in
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => { //as soon as we load our protected route we will try auth()
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);//get the refresh token
        try {//we are trying to send the refresh token to this route which should give us an access token
            const res = await api.post("/api/token/refresh/", { 
                refresh: refreshToken,
            });
            if (res.status === 200) {//if it was was successfull...IsAuthorized = true
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };


    //this function automatically refreshes the token
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);//checking if you have the token
        if (!token) { //if you don't have the token
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) { //if setIsAuthorized is still null we just wait
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;