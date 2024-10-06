import {useNavigate} from 'react-router-dom'

function Card(props) {
    const navigate = useNavigate();

    const countryDetail = () => {
        navigate(`/rest-countries-api/country/${props.attribute.name.common}`);
    };
    
    return (
        <div className="country-card" onClick={countryDetail}>
            <img className="card-country-img" src={props.attribute.flags.png}/>
            <div className="country-card-content">
                <h2 className="card-country-name">
                    {props.attribute.name.common}
                </h2>
                <h4>Population: <span className='country-card-light'>{props.attribute.population.toLocaleString()}</span></h4>
                <h4>Region: <span className='country-card-light'>{props.attribute.region}</span></h4>
                <h4>Capital: <span className='country-card-light'>{props.attribute.capital?.[0] || 'N/A'}</span></h4>
            </div>
        </div>
    )
}

export default Card;