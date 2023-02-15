import React from "react"
import { Link } from "react-router-dom"



export default function NotAuthorized() {

    return <div className="m-4">
        <h3>Для продолжения нужно <Link to="/login"> войти в аккаунт </Link> или <Link to="/register"> зарегестрироваться </Link>.</h3>
    </div>
}