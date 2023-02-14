import { React, useState } from "react";
import { UserContext } from "./UserContext";



/**
 * Провайдер, оборачивающий дочерние элементы в UserContext и предоставляющий им обьект user, который он хранит в своем стейте,
 * и колбеки fetchUser и removeUser.
 * Таким образом, любой дочерний элемент имеет доступ к обьекту пользователя и могут устанавливать 
 * или сбрасывать этот обьект с помощью колбеков, чем пользуются компоненты логина, выхода, регистрации, а также 
 * главный родительский компонент.
 */
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    /**
     * Делает запрос на защищенный авторизацией api-эндпоинт и фетчит обьект пользователя, сохраняя его в стейт user.
     * Для успешного фетча необходимо, чтобы в браузере была cookie сессии серверного api, то есть чтобы пользователь был залогинен.
     */
    function fetchUser() {
        (async () => {
            const response = await fetch(process.env.REACT_APP_API_HOST + "/api/account/getcurrentuser/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })
            if (response.ok) {
                setUser(await response.json())
            }
            
        })()
        
    }

    /**
     * Сбрасывает стейт user на null. Равносильно выходу из аккаунта.
     */
    function removeUser() {
        setUser(null)
    } 

    return <>
        <UserContext.Provider value={{user, fetchUser, removeUser}}>
            {children}
        </UserContext.Provider>
    </>
}