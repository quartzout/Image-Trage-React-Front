import React from "react"
import { useNavigate } from "react-router-dom"
import UserImages from "./UserImages"

export default function ShortUser({ user }) {

    const navigate = useNavigate()

    function GotoUser() {
        navigate(`/users/${user.email}/`)
    }

    return <div className="card my-4" onClick={GotoUser}>
        <h3>{user.displayName}</h3>
        <h4>{user.email}</h4>
        <UserImages 
            email={user.email} 
            status="onSale" 
            pickedImage={null} 
            setPickedImage={()=>{}} 
            lastImagesChangeTimestamp={0} 
            maxNumber={5}
        />
        <UserImages 
            email={user.email} 
            status="inGallery" 
            pickedImage={null} 
            setPickedImage={()=>{}} 
            lastImagesChangeTimestamp={0} 
            maxNumber={10}
        />
    </div>
}