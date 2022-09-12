import React, { useState } from 'react';
import useLocationRandom from '../hooks/useLocationRandom';
import Locations from './Locations';

const HeaderInput = () => {

    const { locationId, setLocationId, searchLocationById, fun} = useLocationRandom()

    return (
        <div className='header_app'>
            <div className='header_input'>
                <div className='search'>
                <input type="text" 
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                placeholder='Search a location'/>
                <button onClick={fun}>Run</button>
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