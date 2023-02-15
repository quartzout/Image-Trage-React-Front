import { React } from "react"
import { Link } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import LogoutLink from "../Components/LogoutLink";


export default function Navbar() {
    
    const { user } = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container-fluid">
        
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        
                <div className="collapse navbar-collapse" id="navbarColor01">
            
                    <ul className="navbar-nav">
                
                        <Link to="/" className="nav-item">Home</Link>

                        <Link to="/Users" className="nav-item">Users</Link>


                    </ul>

                    {user ? 
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item navbar-text text-success me-5">
                                <h5><strong><span id="coin-balance">{user.coinBalance}</span></strong></h5>
                            </li>

                            <Link to={`users/${user.email}`} className="nav-item text-dark">{user.displayName}</Link>

                            <Link to="/Generate" className="nav-item">Generate</Link>

                            <LogoutLink/>

                        </ul> 
                    : 
                        <ul className="navbar-nav ms-auto">

                            <Link to="/Login" className="nav-item">Login</Link>
                        
                            <Link to="/Register" className="nav-item">Register</Link>
                        
                        </ul>
                    }

                </div>

            </div>

        </nav>
    )
}