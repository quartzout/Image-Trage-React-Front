import React, { useCallback, useEffect, useState } from "react"

export default function OwnedPickedImage({ image, resetPickedImage, setLastImagesChangeTimestamp }) {

    /**
     * Функция, возвращающая новый обьект formData, взятый из пропа image. 
     * Вызывается для установки первого значения formData в useState, а также
     * через useEffect каждый раз, когда image изменяется по указанию родительского компонента.
     */
    const getFormDataFromImage = useCallback(() => image ? {
        name: image.name ?? "",
        description: image.description ?? "",
        isOnSale: image.isOnSale,
        price: image.price
    } : {
        name: "" ,
        description: "",
        isOnSale: false,
        price: 0
    }, [image])

    const [formData, setFormData] = useState(getFormDataFromImage())

    //image как зависимость передать нельзя - выдает предупреждение, что getFormDataFromImage - незарегестрированная зависимость.
    //Чтобы можно было передать функцию как зависимость вместо image, ее определение нужно обернуть в useCallback и указать,
    //от чего зависит уже ее результат, и таким образом react будет возвращать из useCallback новую функцию и тригеррить тем самым
    //useEffect толкьо тогда, когда изменяется image.
    useEffect(() => {
        setFormData(getFormDataFromImage())
    }, [getFormDataFromImage])
    
    function ChangeFormData(event) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }))
    }

    async function SaveChanges() {

        const { price, ...formDataWithoutPrice } = formData
        const objectToSend = {
            ...formDataWithoutPrice,
            price: parseInt(price),
            id: image.id
        }

        const response = await fetch(process.env.REACT_APP_API_HOST + "/api/useractions/updateimageinfo", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(objectToSend)
        })
        if (response.ok) {
            resetPickedImage()
            setLastImagesChangeTimestamp(Date.now())
        }       
        
    }

    return (
        <form className="col-12 d-flex flex-column align-items-center mb-5 card">
            <div className="m-4">

                <img alt="" className="img-thumbnail mw-50 mb-3" src={process.env.REACT_APP_API_HOST + ( image ? "/" + image.webFullName : "/images/generate-placeholder.png")}/>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Название</label>
                    <input disabled={!image}  type="text" className="form-control" aria-describedby="emailHelp" name="name" value={formData.name} onChange={ChangeFormData}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Описание</label>
                    <textarea disabled={!image} className="form-control" placeholder="(необязательно)" name="description" value={formData.description} onChange={ChangeFormData}></textarea>
                </div>

                <div className="mb-3 form-check">
                    <input disabled={!image} type="checkbox" className="form-check-input" name="isOnSale" checked={formData.isOnSale} onChange={ChangeFormData}/>
                    <label className="form-check-label" htmlFor="isOnSale">Выставить на продажу</label>
                </div>

                {formData.isOnSale &&
                <div className="fixed-height" style={{height: 80}}>
                    <div className="mb-3" id="price-box">
                        <label htmlFor="price" className="form-label">Цена</label>
                        <input disabled={!image} type="number" className="form-control" aria-describedby="Цена в монетах" name="price" value={formData.price} onChange={ChangeFormData}/>
                    </div>
                </div>}

                <button disabled={!formData.name || (formData.isOnSale && parseInt(formData.price) <= 0)} className="btn btn-primary btn-lg " type="button" onClick={SaveChanges}>
                    Сохранить
                </button>
            </div>
        </form>
    )
        
}