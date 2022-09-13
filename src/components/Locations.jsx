import { useState, useEffect } from 'react';
import axios from 'axios';
import ResidentInfo from './ResidentInfo'

const Locations = () => {

    const [locationId, setLocationId] = useState("")
    const [location, setLocation] = useState({})

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

    return (
        <div className='header_app'>
            <div className='header_input'>
                <div className='search'>
                <input type="text" 
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                placeholder='Search a location'/>
                <button onClick={searchLocationById}>Run</button>
                </div>
            </div>

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
                            location.residents?.map(resident => (
                                <ResidentInfo
                                resident={resident}
                                key={resident.url}/>
                            ))
                        }
                    </div>
                </div>
                </div>
            </div>
    );
};

export default Locations;