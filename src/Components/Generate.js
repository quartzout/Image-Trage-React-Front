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
            <div className="row">

                <h2>Генератор</h2> 

                <div className="col-9">

                    <div className="d-flex mb-5 mt-3">
                        <button onClick={GenerateImage} id="generate-button" className="btn btn-lg btn-primary">
                            Сгенерировать новую картинку &nbsp;<strong className="text-success">1₵</strong>
                        </button>
                        <strong className="text-success d-flex justify-content-center flex-column mx-4 mt-2"><h5>{user.coinBalance}₵ имеется</h5></strong>
                    </div>

                    <UserImages 
                        email={user.email}
                        status="inHeap" 
                        pickedImage={pickedImage} 
                        setPickedImage={setPickedImage}
                        lastImagesChangeTimestamp={lastImagesChangeTimestamp}
                        setLastImagesChangeTimestamp={setLastImagesChangeTimestamp}/>
                </div>

                <div className="col-3 d-flex flex-column align-items-center">

                    <OwnedPickedImage 
                        image={pickedImage} 
                        resetPickedImage={resetPickedImage} 
                        setLastImagesChangeTimestamp={setLastImagesChangeTimestamp}
                    />

                </div>

            </div>
    )

}