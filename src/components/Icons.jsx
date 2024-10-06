import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const MoonIcon = () => {
    return <FontAwesomeIcon icon={faMoon} />;
};

export const SearchIcon = () => {
    return <FontAwesomeIcon 
                icon={faSearch}
                className='search-icon' 
            />;
};

