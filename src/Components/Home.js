import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../Auth/useAuth"

export default function Home() {

    const { user } = useAuth()

    return <>
        <h2>{`Добро пожаловать${user ? ", " + user.displayName : ""}!`}</h2>
        {!user && <h4><Link to="/login">Войдите в аккаунт</Link> или <Link to="/register">зарегестрируетесь</Link>, чтобы начать генерировать изображения. </h4>}
        {user && <h4>Вы можете <Link to="/generate">генерировать</Link> изображения за монеты, а затем сохранять их в своей <Link to={`/users/${user.email}`}>галерее</Link> или выставлять на продажу.</h4>}
        <h4>Просматривать и покупать изображения других пользователей вы можете в разделе <Link to="/users">Пользователи</Link></h4>
    </>
}