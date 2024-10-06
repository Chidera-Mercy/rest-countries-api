import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Filter from './components/Filter';
import Card from './components/Card';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CountryDetailApp from './CountryDetailApp';

function App() {
  // State to hold country data
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch data from REST Countries API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (regionFilter) {
      filtered = filtered.filter(country => country.region === regionFilter);
    }

    setFilteredCountries(filtered);
  }, [searchTerm, regionFilter, countries]);

  // Parse query parameters from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const region = params.get('region') || '';

    setSearchTerm(search);
    setRegionFilter(region);
  }, [location.search]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    navigate(`/?search=${searchValue}&region=${regionFilter}`);
  };

  const handleRegionFilter = (regionValue) => {
    setRegionFilter(regionValue);
    navigate(`/?search=${searchTerm}&region=${regionValue}`);
  };

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const countryElements = filteredCountries.map(country => (
    <Card
      key={country.cca3}
      attribute={country}
    />
  ));

  return (
    <>
      <Navbar />
      {location.pathname === '/' && (
        <div className='searchbar-filter'>
          <Searchbar onSearch={handleSearch} searchValue={searchTerm} />
          <Filter onRegionSelect={handleRegionFilter} selectedRegion={regionFilter} />
        </div>
      )}
      <Routes>
        <Route 
          path="/"
          element={
            <div className='country-grid'>
              {countryElements}
            </div>
          }
        />
        <Route path="/country/:countryName" element={<CountryDetailApp />} />
      </Routes>
    </>
  );
}

export default App;
