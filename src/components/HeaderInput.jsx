import React, { useState } from 'react';
import useLocationRandom from '../hooks/useLocationRandom';
import axios from 'axios';
import Locations from './Locations';

const HeaderInput = () => {

    const { setLocation, fun} = useLocationRandom()

    const [locationId, setLocationId] = useState("")

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
                {/* {
                    fun()
                } */}
                </div>
            </div>
            <Locations/>
        </div>
    );
};

export default HeaderInput;