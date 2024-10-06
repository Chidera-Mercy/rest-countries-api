import { SearchIcon } from "./Icons"

function Searchbar({ onSearch, searchValue }) {
    const handleInputChange = (event) => {
        onSearch(event.target.value)
    };

    return (
        <div className='search-container'>
            <SearchIcon/>
            <input 
                type='text' 
                placeholder="Search for a country..." 
                className="search-input"
                value={searchValue}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default Searchbar