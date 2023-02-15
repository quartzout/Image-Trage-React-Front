import useAuth from "../Auth/useAuth";

export default function OthersPickedImage({ image, resetPickedImage, setLastImagesChangeTimestamp, setLastBalanceChangeTimestamp }) {

    const { user } = useAuth()

    async function Buy() {

        const response = await fetch(process.env.REACT_APP_API_HOST + `/api/useractions/buy/${image.id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        if (response.ok) {
            resetPickedImage()
            setLastImagesChangeTimestamp(Date.now())
            setLastBalanceChangeTimestamp(Date.now())
        }
            
    }


    return (
        <form className="card">

            <div className="col d-flex flex-column align-items-center mb-5 m-4">
                <img alt="" className="img-thumbnail" src={process.env.REACT_APP_API_HOST + ( image ? "/" + image.webFullName : "/images/generate-placeholder.png")}/>
                
                {image && <>
                    <h3 className="mt-3">{image.name}</h3>
                    <p className="mt-2">{image.description}</p>
                
                    {image.isOnSale && <button disabled={!user || user.coinBalance < image.price} className="btn btn-primary btn-lg " type="button" onClick={Buy}>
                        Купить &nbsp;&nbsp;&nbsp; <strong className="text-success">{image.price}₵</strong>
                    </button>}
                </>}
            </div>
        </form>
    )
        
}