import { useState } from 'react';

export const useCountryData = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCapital, setSelectedCapital] = useState('');
  const [selectedPopulation, setSelectedPopulation] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [nationalDay, setNationalDay] = useState('');
  const [languages, setLanguages] = useState([]);
  const [currency, setCurrency] = useState('');

  const resetCountryDetails = () => {
    setSelectedCapital('Necunoscută');
    setSelectedPopulation('Necunoscută');
    setTotalArea('Necunoscută');
    setNationalDay('Necunoscută');
    setLanguages([]);
    setCurrency('Necunoscută');
  };

  const fetchCountryDetails = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        resetCountryDetails();
        return;
      }

      const countryData = data[0];
      const capital = countryData.capital ? countryData.capital[0] : 'Necunoscută';
      const population = countryData.population ? countryData.population.toLocaleString() : 'Necunoscută';
      const area = countryData.area ? `${countryData.area.toLocaleString()} km²` : 'Necunoscută';

      setSelectedCapital(capital);
      setSelectedPopulation(population);
      setTotalArea(area);

      if (countryData.currencies) {
        const currencyCode = Object.keys(countryData.currencies)[0];
        setCurrency(`${countryData.currencies[currencyCode].name} (${countryData.currencies[currencyCode].symbol || currencyCode})`);
      } else {
        setCurrency('Necunoscută');
      }

      setLanguages(countryData.languages ? Object.values(countryData.languages) : []);
      fetchNationalDay(countryData.cca2 || countryData.alpha2Code);

    } catch (error) {
      console.error('Error fetching country details:', error);
      resetCountryDetails();
    }
  };

  const fetchNationalDay = async (code) => {
    try {
      const response = await fetch(`https://date.nager.at/api/v3/publicholidays/2024/${code}`);
      const holidays = await response.json();
      
      if (!Array.isArray(holidays) || holidays.length === 0) {
        setNationalDay('Indisponibil');
        return;
      }

      const nationalDayHoliday = holidays.find(holiday =>
        holiday.types.includes('Public') &&
        (holiday.name.toLowerCase().includes('national') ||
         holiday.name.toLowerCase().includes('independence') ||
         holiday.name.toLowerCase().includes('republic') ||
         holiday.name.toLowerCase().includes('revolution') ||
         holiday.name.toLowerCase().includes('liberation'))
      );

      setNationalDay(nationalDayHoliday ? `${nationalDayHoliday.date} - ${nationalDayHoliday.name}` : 'Necunoscută');
    } catch (error) {
      console.error('Error fetching national day:', error);
      setNationalDay('Eroare la obținerea informațiilor');
    }
  };

  return {
    selectedCountry,
    setSelectedCountry,
    selectedCapital,
    selectedPopulation,
    totalArea,
    nationalDay,
    languages,
    currency,
    fetchCountryDetails,
    resetCountryDetails
  };
};