import { React } from "react"
import { Link } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import LogoutLink from "../Components/LogoutLink";


export default function Navbar() {
    
    const { user } = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container-fluid">
        
                <div className="collapse navbar-collapse" id="navbarColor01">
            
                    <ul className="navbar-nav">
                
                        <Link to="/" className="nav-item nav-link d-flex justify-content-center flex-column">Домой</Link>

                        <Link to="/Users" className="nav-item nav-link d-flex justify-content-center flex-column">Пользователи</Link>


                    </ul>

                    {user ? 
                        <ul className="navbar-nav ms-auto">

                            <div className="me-5 card p-2">
                                <strong className="text-success d-flex justify-content-center flex-column">
                                    <h5>
                                        Баланс: {user.coinBalance}₵ 
                                    </h5>
                                </strong>
                            </div>

                            <Link to={`users/${user.email}`} className="nav-item nav-link d-flex justify-content-center flex-column">{user.displayName}</Link>

                            <Link to="/Generate" className="nav-item nav-link d-flex justify-content-center flex-column">Генерировать</Link>

                            <LogoutLink/>

                        </ul> 
                    : 
                        <ul className="navbar-nav ms-auto">

                            <Link to="/Login" className="nav-item nav-link d-flex justify-content-center flex-column">Войти</Link>
                        
                            <Link to="/Register" className="nav-item nav-link d-flex justify-content-center flex-column">Зарегестрироваться</Link>
                        
                        </ul>
                    }

                </div>

            </div>

        </nav>
    )
}