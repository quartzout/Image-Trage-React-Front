import React from "react"


export default function ImageCard({image, isPicked, pickThisImage}) {

    const {days, hours, minutes, seconds} = image.generatedAgoTimespanSegments

    return (
        <div className={"card col-3 " + (isPicked ? "bg-primary" : "")} onClick={pickThisImage}>
            <img alt="" src={process.env.REACT_APP_API_HOST + "/" + image.webFullName} className="card-img-top"/>
            <div className="card-body">
                {image.name && <p className="card-text"> 
                    {image.name}
                    {image.price && image.isOnSale && <strong className="text-success">&nbsp;&nbsp;&nbsp;{image.price}</strong>}
                </p>}
                <p className="card-text"> <small className="text-muted">{`${days}d. ${hours}h. ${minutes}m. ${seconds}s. ago`}</small></p>
            </div>
        </div>
        )
}