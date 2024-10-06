function Filter({ onRegionSelect, selectedRegion }) {
    const handleRegionChange = (event) => {
        onRegionSelect(event.target.value);
    };

    return (
        <select 
            className='filter-input'
            value={selectedRegion || ''} 
            onChange={handleRegionChange}
        >
            <option value=''>Filter by Region</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
        </select>
    );
}

export default Filter;
