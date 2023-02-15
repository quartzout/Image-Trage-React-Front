import React, { useEffect, useState } from "react"
import ImageCard from "./ImageCard"


export default function UserImages({ email, status, pickedImage, setPickedImage, lastImagesChangeTimestamp, maxNumber }) {

    const [ images, setImages ] = useState([])

    useEffect(() => {
        (async () => {
            if (!email) return
            const response = await fetch(process.env.REACT_APP_API_HOST + `/api/userimages/${email}/${status}`, {
                method: "GET",
                credentials: "include"
            })
        
            if (response.ok) {
                setImages((await response.json()).images)
            }
        })()
        
    }, [email, status, lastImagesChangeTimestamp])


    return <div className="row">
        {images.slice(0, maxNumber ?? 9999).map(image => 
            <ImageCard 
                image={image} 
                key={image.id} 
                pickThisImage={() => { setPickedImage(image) }}
                isPicked={pickedImage && image.id === pickedImage.id}
            />
        )}
    </div>
}