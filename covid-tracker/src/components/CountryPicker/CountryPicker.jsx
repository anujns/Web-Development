import React, { useState, useEffect} from 'react';
import { fetchCountries } from '../../api'
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setfetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setfetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setfetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option value={country} key={i}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;