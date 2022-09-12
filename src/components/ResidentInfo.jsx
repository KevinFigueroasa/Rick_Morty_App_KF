import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

const ResidentInfo = ({url_resident}) => {

    const [getResident, setGetResident] = useState('')

    useEffect(() => {
        axios
        .get(`${url_resident}`)
        .then(res => setGetResident(res.data))
    }, [])

    // console.log(getResident)

    return (
        <div className='residents-cards' >
            <div className='resident-card'>
                <div className='dead-alive'>
                    <p style={getResident.status === 'Alive' ? {background: 'green'} : getResident.status === 'Dead' ? {background: 'red'} : {background: 'grey'}}>{getResident.status}</p>
                    <img src={getResident.image} alt=""/>
                </div>
                <div className='residents-info'>
                    <h2>{getResident.name}</h2>
                    <h3>Raza
                        <p>{getResident.species}</p>
                    </h3>
                    <h3>Origen
                        <p>{getResident.origin?.name}</p>
                    </h3>
                    <h3>Veces en debut
                        <p>{getResident.episode?.length}</p>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ResidentInfo;