import React, { useEffect, useState } from "react"
import ShortUser from "./ShortUser"



export default function Users() {

    const [ users, setUsers ] = useState([])

    useEffect(() => {

        (async () => {
            const usersResponse = await fetch(process.env.REACT_APP_API_HOST + "/api/user/all", {
                method: "GET",
                credentials: "include"
            })
        
            if (usersResponse.ok) {

                let tempUsers = await Promise.all((await usersResponse.json()).map(async user => {
                  
                    var images = 0

                    const imagesResponse = await fetch(process.env.REACT_APP_API_HOST + `/api/userimages/${user.email}/inGallery`, {
                        method: "GET",
                        credentials: "include"
                    })
                    if (imagesResponse.ok) {
                        images = (await imagesResponse.json()).images.length
                    }
                    
                    return {
                        ...user,
                        images: images
                    }

                }))
                
                tempUsers.sort((userA, userB) => {
                    if (userA.images === userB.images) return 0
                    else if (userA.images === userB.images) return 1
                    else return -1
                })


                setUsers(tempUsers)
            }
        })()
    }, [])


    return <>
        <h2>Users</h2>
        {users.map(user => <ShortUser user={user}/>)}
    </>
}