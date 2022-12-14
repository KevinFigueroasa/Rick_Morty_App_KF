import { useState, useEffect } from 'react';
import axios from 'axios';
import ResidentInfo from './ResidentInfo'
import useOnclickOutside from 'react-cool-onclickoutside';

const Locations = () => {

    const [isOpened, setIsOpened] = useState(false)

    const [inputValue, setInputValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [location, setLocation] = useState({})
    const [selectedLocation, setSelectedLocation] = useState('')
    const [selectedPage, setSelectedPage] = useState(0);

    const ref = useOnclickOutside(() => {
        setIsOpened(false)
    })

    const searchLocationById = () => {
        axios
            .get(`https://rickandmortyapi.com/api/location/${inputValue}`)
            .then(res => setLocation(res.data))
    }

    const onShowSuggest = ({ target }) => {
        setInputValue(target.value);
        if (target.value) {
            document.querySelector('.search').classList.add('open'); // Esto hace que la Opacidad establecida en 0 en la clase Suggests se convierta en 1 al agregar la clase open que tienen la propiedad opacity: 1;
        } else {
            document.querySelector('.search').classList.remove('open');
        }
    }

    useEffect(() => {
        axios
            .get(`https://rickandmortyapi.com/api/location?name=${inputValue}`)
            .then(res => setSuggestions(res.data.results))
            setIsOpened(true)
    }, [inputValue])


    const onSelectedLocation = ({ target }) => {
        setSelectedLocation(target.textContent)
        setSelectedPage(0);
    }

    useEffect(() => {
        document.querySelector('.search').classList.remove('open');
        setInputValue('');
        axios
            .get(`https://rickandmortyapi.com/api/location?name=${selectedLocation}`)
            .then(res => setLocation(res.data.results[0]))
        setInputValue('');
    }, [selectedLocation])

    useEffect(() => {
        const randomId = Math.floor(Math.random() * 126) + 1
        axios
            .get(`https://rickandmortyapi.com/api/location/${randomId}`)
            .then(rest => setLocation(rest.data))
    }, [])

    console.log(location)

    return (
        <div className='header_app'>
            <div className='header_input'>
                <form
                    className='search center-item'
                    onSubmit={e => e.preventDefault()}
                >
                    <input
                        className='search__input'
                        type="text"
                        value={inputValue}
                        onChange={onShowSuggest}
                        placeholder='Search a location'
                    />
                    {isOpened && (
                        <ul ref={ref} className="suggests">
                            {
                                suggestions?.length
                                    ?
                                    <>
                                        {
                                            suggestions.map(suggestion => (
                                                <li
                                                    onClick={onSelectedLocation}
                                                    className="suggest__item"
                                                    key={suggestion.id}>{suggestion.name}</li>
                                            ))
                                        }
                                    </>
                                    :
                                    <li>No results</li>
                            }
                        </ul>
                    )}

                    <button onClick={searchLocationById}>Run</button>
                </form>

            </div>

            <div className='resident-info'>
                <div className='resident-random'>
                    <h3>Nombre:
                        <p>{location.name}</p>
                    </h3>
                    <h3>Tipo:
                        <p>{location.type}</p>
                    </h3>
                    <h3>Dimensi??n:
                        <p>{location.dimension}</p>
                    </h3>
                    <h3>Poblaci??n:
                        <p>{location.residents?.length}</p>
                    </h3>
                </div>

                <div className='characters'>
                    <h1>{location.name}</h1>
                    <div className='residents'>
                        {
                            location.residents?.map((resident) => (
                                <ResidentInfo key={resident} resident={resident} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;