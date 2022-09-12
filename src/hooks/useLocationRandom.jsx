import ResidentInfo from "../components/ResidentInfo";
import { useEffect, useState } from "react";
import axios from "axios";

const useLocationRandom = () => {

    const [location, setLocation] = useState({})
    const [locationId, setLocationId] = useState("")


    useEffect(() => {
        const randomId = Math.floor(Math.random() * 126) + 1
        axios
        .get(`https://rickandmortyapi.com/api/location/${randomId}`)
        .then(rest => setLocation(rest.data))
    }, [])

    const searchLocationById = () => {
        axios
        .get(`https://rickandmortyapi.com/api/location/${locationId}`)
        .then(res => setLocation(res.data))
    }

    console.log(location)

    const fun = () => {
        return (
            <div className='resident-info'>
                <div className='resident-random'>
                    <h3>Nombre:
                        <p>{location.name}</p>
                    </h3>
                    <h3>Tipo:
                        <p>{location.type}</p>
                    </h3>
                    <h3>Dimensión:
                        <p>{location.dimension}</p>
                    </h3>
                    <h3>Población:
                        <p>{location.residents?.length}</p>
                    </h3>
                </div>
    
                <div className='characters'>
                    <h1>{location.name}</h1>
                    <div className='residents'>
                        {
                            location.residents?.map(url_resident => (
                                <ResidentInfo url_resident={url_resident} key={url_resident.id}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }

    return { location, fun, setLocation, searchLocationById, setLocationId, locationId}
};

export default useLocationRandom;