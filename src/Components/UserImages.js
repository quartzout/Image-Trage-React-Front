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
                let images = (await response.json()).images
                images.sort((imageA, imageB) => {
                    const timespanFromSegments = ({days, hours, minutes, seconds}) => ((days * 24 + hours) * 60 + minutes) * 60 + seconds
                    return Math.sign(timespanFromSegments(imageA.generatedAgoTimespanSegments) - timespanFromSegments(imageB.generatedAgoTimespanSegments))
                })
                setImages(images)
            }
        })()
        
    }, [email, status, lastImagesChangeTimestamp])

    const textStatus = status === "onSale" ? "Продаются" : (status === "inHeap" ? "Сгенерированные" : "Галерея")
    const emptyStatus = status === "onSale" ? "Ничего не продается" : (status === "inHeap" ? "Ничего не сгенерировано" : "В галерее ничего нет")

    return <div className="row">
        {images.length > 0 ? <h4>{textStatus}</h4> : <p>{emptyStatus}</p>}
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