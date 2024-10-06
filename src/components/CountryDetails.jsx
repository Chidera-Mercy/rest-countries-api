import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


function CountryDetails() {
    const {countryName} = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);
    const navigate = useNavigate();

    // Fetch details of the selected country
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                setCountry(response.data[0]);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [countryName]);

    // Fetch border country names based on their codes
    useEffect(() => {
        if (country && country.borders) {
            const borders = country.borders.join(',');
            axios.get(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
                .then(response => {
                    setBorderCountries(response.data)
                })
                .catch(err => {
                    console.error("Error fetching border countries", err);
                })
        }
    }, [country])

    // Navigate to the country detail page when a border country is clicked
    const handleBorderClick = (borderCountryName) => {
        navigate(`/rest-countries-api/country/${borderCountryName}`);
    };

    // Check if country and nativeName are defined
    const nativeNames = country?.name?.nativeName;
    let nativeNamesString = 'Not available';
    if (nativeNames) {
        let nativeNamesArray = [];
        for (const lang in nativeNames) {
            nativeNamesArray.push(nativeNames[lang].common);
        }
        nativeNamesString = nativeNamesArray.join(', ');
    }

    return ( country && (
        <div className='country-details-container'>
            <img 
                className='country-details-flag'
                src={country.flags.png} 
                alt="" 
            />
            <div className='country-details-info'>
                <h1 className='country-details-name'>{country.name.common}</h1>
                <div className='country-details-columns'>
                    <div className='country-details-left'>
                        <h4>
                            Native Name: <span 
                                className='country-detail-light'
                            >
                                {nativeNamesString}
                            </span>
                        </h4>
                        <h4>
                            Population: <span 
                                className='country-detail-light'
                            >
                                {country.population.toLocaleString()}
                            </span>
                        </h4>
                        <h4>
                            Region: <span 
                                className='country-detail-light'
                            >
                                {country.region}
                            </span>
                        </h4>
                        <h4>
                            Sub Region: <span 
                                className='country-detail-light'
                            >
                                {country.subregion}
                            </span>
                        </h4>
                        <h4>
                            Capital: <span 
                                className='country-detail-light'
                            >
                                {country.capital?.[0]}
                            </span>
                        </h4>
                    </div>
                    <div className='country-details-right'>
                        <h4>
                            Top Level Domain: <span 
                                className='country-detail-light'
                            >
                                {country.tld?.[0]}
                            </span>
                        </h4>
                        <h4>
                            Currencies: <span 
                                className='country-detail-light'
                            >
                                {Object.values(country.currencies || {}).map(cur =>cur.name).join(', ')}
                            </span>
                        </h4>
                        <h4>
                            Languages: <span       
                                className='country-detail-light'
                            >
                                {Object.values(country.languages || {}).join(', ')}
                            </span>
                        </h4>
                    </div>
                </div>
                <div className='country-borders'>
                    <h4>Border Countries: </h4> 
                    {borderCountries.length > 0 ? (
                        borderCountries.map(borderCountry => (
                            <button 
                                key={borderCountry.cca3} 
                                className='border-button'
                                onClick={()=> handleBorderClick(borderCountry.name.common)}
                            >
                                {borderCountry.name.common}
                            </button>
                        ))
                    ) : ('None')}
                </div>
            </div>
        </div>
    ));
}

export default CountryDetails;