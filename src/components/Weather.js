import React, { useState, useEffect } from 'react';
import './Weather.css';

const api = {
    key: "a9bc80d0d6e17855f687f25fdbea0d90",
    base: "https://api.openweathermap.org/data/2.5/",
}

function Weather() {
    const [inputSearch, setInputSearch] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [infoSearch, setInfoSearch] = useState("")
    const [loangding, setLoangding] = useState(false);
    const [erorrMessage, seterorrMessage] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            if (!searchCity) return;
            setLoangding(true);
            try {
                const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setInfoSearch(
                        <>
                            <div>
                                City : {data.name},{data.sys.country}
                            </div>
                            <div>
                                weather : {data.weather[0].description}
                            </div>

                        </>
                    )
                } else { setInfoSearch(data.message) }


            } catch (error) {
                seterorrMessage(error.message)
            }

            setLoangding(false);
        }
        fetchAPI()

    }, [searchCity])

    const handleSumit = (e) => {
        e.preventDefault();
        setSearchCity(inputSearch);
    }

    return (
        <>
            <div className='container'>
                <div className='weather'>
                    Weather Live
                </div>
                <form onSubmit={handleSumit}>
                    <input
                        type="text"
                        placeholder='city'
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <button >Search</button>
                </form>
                <div className='text'>
                    {loangding ? (<div>Loangding...</div>) :
                        (<div> {erorrMessage ? (<div style={{ color: "red" }}>{erorrMessage}</div>) :
                            (<div>{infoSearch}</div>)}</div>)}

                </div>

            </div>





        </>
    )


}

export default Weather