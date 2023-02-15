import React from "react"
import { Navigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";


export default function LogoutLink() {

    const { removeUser } = useAuth();

    async function logout() {
        const response = await fetch(process.env.REACT_APP_API_HOST + "/api/account/logout/", {
            method: "POST",
            credentials: "include"
        })
    
        if (response.ok) {
            removeUser()
            Navigate("/")
        }
    }

    return <button className="btn btn-link nav-item nav-link" onClick={logout}>Logout</button>
        

}