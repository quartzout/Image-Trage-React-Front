import React from "react"


export default function ImageCard({image, isPicked, pickThisImage}) {

    const {days, hours, minutes, seconds} = image.generatedAgoTimespanSegments

    return (
        <div className={"col-xxl-2 col-lg-3 col-md-4 col-5 card m-1 p-2 " + (isPicked ? "bg-primary" : "")} onClick={pickThisImage}>
            <img alt="" src={process.env.REACT_APP_API_HOST + "/" + image.webFullName} className="card-img-top"/>
            <div className="card-body">
                {image.name && 
                    <>
                        <h5>{image.name}</h5>
                        {(image.price && image.isOnSale) ? <h5><strong className="text-success col-4">{image.price}₵</strong></h5> : null}
                    </>
                }
                <p className="card-text"> <small className="text-muted">{`${days}дн ${hours}ч ${minutes}м ${seconds}с`}</small></p>
            </div>
        </div>
        )
}