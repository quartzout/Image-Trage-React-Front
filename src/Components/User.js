import React, { useEffect, useState } from "react"
import useAuth from "../Auth/useAuth"
import OwnedPickedImage from "./OwnedPickedImage"
import OthersPickedImage from "./OthersPickedImage"
import UserImages from "./UserImages"
import { useParams } from "react-router-dom"


export default function User({ setLastBalanceChangeTimestamp }) {

    const { user } = useAuth()

    const [ pageUser, setPageUser ] = useState(null)


    const { email } = useParams()

    useEffect(() => {
        (async () => {
            if (!email) return
            const response = await fetch(process.env.REACT_APP_API_HOST + `/api/user/find/${email}`, {
                method: "GET",
                credentials: "include"
            })
        
            if (response.ok) {
                setPageUser((await response.json()))
            }
        })()
    }, [email])


    const [pickedImage, setPickedImage] = useState(null)
    const [lastImagesChangeTimestamp, setLastImagesChangeTimestamp] = useState(0)

    return <>{pageUser && 
        <div className="row">
            <div className="col-8">
                <h2>{pageUser.displayName}</h2>
                <h3>{pageUser.email}</h3>
                <p>{pageUser.description ?? ""}</p>

                <h2>{pageUser.displayName}'s images on sale</h2>
                <UserImages 
                    email={pageUser.email}
                    status="onSale" 
                    pickedImage={pickedImage} 
                    setPickedImage={setPickedImage} 
                    lastImagesChangeTimestamp={lastImagesChangeTimestamp}
                />
                <h2>{pageUser.displayName}'s images in gallery</h2>
                <UserImages 
                    email={pageUser.email}
                    status="inGallery" 
                    pickedImage={pickedImage} 
                    setPickedImage={setPickedImage} 
                    lastImagesChangeTimestamp={lastImagesChangeTimestamp}
                />
            </div>
            <div className="col-4">
                {user && (user.id === pageUser.id) ?
                    <OwnedPickedImage 
                        image={pickedImage} 
                        resetPickedImage={() => { setPickedImage(null) }} 
                        setLastImagesChangeTimestamp={setLastImagesChangeTimestamp}
                    />
                :
                    <OthersPickedImage 
                        image={pickedImage} 
                        resetPickedImage={() => { setPickedImage(null) }} 
                        setLastImagesChangeTimestamp={setLastImagesChangeTimestamp}
                        setLastBalanceChangeTimestamp={setLastBalanceChangeTimestamp}
                    />
                }
                
            </div>
            
        </div>
    }</>
}