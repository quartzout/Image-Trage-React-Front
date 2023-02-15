import React from "react"
import { Link, useNavigate } from "react-router-dom"
import UserImages from "./UserImages"

export default function ShortUser({ user }) {


    return <div className="border border-3 border-primary rounded-4 my-5 p-4">
        
        <div className="d-flex">
            <div className="card mb-4 p-2">
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
                <Link to={`/users/${user.email}`} className="stretched-link" />
            </div>
        </div>

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