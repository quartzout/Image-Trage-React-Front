import React, { useState } from "react"
import useAuth from "../Auth/useAuth"
import OwnedPickedImage from "./OwnedPickedImage"
import UserImages from "./UserImages"


export default function Generate({ setLastBalanceChangeTimestamp }) {

    const { user } = useAuth()

    function resetPickedImage() {
        setPickedImage(null)
    } 

    const [pickedImage, setPickedImage] = useState(null)
    const [lastImagesChangeTimestamp, setLastImagesChangeTimestamp] = useState(0)

    async function GenerateImage() {

        const response = await fetch(process.env.REACT_APP_API_HOST + "/api/useractions/generate", {
            method: "POST",
            credentials: "include"
        })
    
        if (response.ok) {
            setLastImagesChangeTimestamp(Date.now())
            setLastBalanceChangeTimestamp(Date.now())
        }
        
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-12 d-flex flex-column align-items-center">

                    <button onClick={GenerateImage} id="generate-button" className="btn btn-primary btn-lg m-5">
                        Сгенерировать
                        <small className="text-info">1 Coin</small>
                    </button>

                    <OwnedPickedImage 
                        image={pickedImage} 
                        resetPickedImage={resetPickedImage} 
                        setLastImagesChangeTimestamp={setLastImagesChangeTimestamp}
                    />

                </div>

                <div className="container">
                    <UserImages 
                        email={user.email}
                        status="inHeap" 
                        pickedImage={pickedImage} 
                        setPickedImage={setPickedImage}
                        lastImagesChangeTimestamp={lastImagesChangeTimestamp}
                        setLastImagesChangeTimestamp={setLastImagesChangeTimestamp}/>
                </div>

            </div>
        </div>
    )

}