import {React, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../Auth/useAuth"

export default function Login(props) {
    
    const navigate = useNavigate()
    
    const { fetchUser } = useAuth() 

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    })

    const emptyValidationData = {
        global: [],
        displayName: [],
        email: [],
        password: [],
        confirmPassword: []
    }

    const [validationData, setValidationData] = useState(emptyValidationData)

    function onFormChanged(event) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }))
    }

    function submit() {
        (async () => {
            const response = await fetch(process.env.REACT_APP_API_HOST +  "/api/account/login/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                fetchUser()
                navigate("/")
            }
            else {
                const content = await response.json();
                let newValidationData = structuredClone(emptyValidationData)
                for (const key in content.errors) {

                    const jsKey = key === "" ? "global" : key[0].toLowerCase() + key.slice(1) 
                    newValidationData[jsKey] = content.errors[key]
                }
                setValidationData(newValidationData)
            }


        })()
        
    }


    return <>
     
        <div className="d-flex flex-column justify-content-center align-items-center">
            

                <h2 className="mb-4">Войти в аккаунт</h2>
                
                <form className="border rounded-3 p-4">
                    <label for="email">Почта</label>
                    <input type="email" placeholder="Введите адрес почты" id="email" name="email" className="form-control" value={formData.email} onChange={onFormChanged}/> <br/>
                    {validationData.email !== [] && <ul>{validationData.email.map(val => <li className="text-danger">{val}</li>)}</ul> }
        
                    <label for="password">Пароль</label>
                    <input type="password" placeholder="Enter Password" id="password" name="password" className="form-control" value={formData.password} onChange={onFormChanged}/><br/>
                    {validationData.password !== [] && <ul>{validationData.password.map(val => <li className="text-danger">{val}</li>)}</ul> }
                
                    <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={onFormChanged}/> 
                    <label className="ms-2" for="rememberMe">Запомнить</label>

                    {validationData.global !== [] && <ul className="my-4">{validationData.global.map(val => <li className="text-danger">{val}</li>)}</ul> }
        
                    <button type="button" className="btn btn-primary" onClick={submit}>Войти</button>
                </form>

                <p className="mt-4"> Или <Link className="btn btn-primary my-3 ms-2" to="/register">Зарегестрироваться</Link> </p>

        </div>

    
    </>
}