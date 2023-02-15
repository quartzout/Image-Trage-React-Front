import React from "react"
import useAuth from "../Auth/useAuth"
import NotAuthorized from "./NotAuthorized"



export default function Protected({children}) {

    const { user } = useAuth()

    return user ? children : <NotAuthorized/>
}