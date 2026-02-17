import React, { useState, useMemo, useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from './SearchContext';
import "./SearchBar.css";

export default function SearchBar() {

    const [form, setForm] = useState({
        searchTerm: '',
        locationTerm: ''
    });

    const { setSearchTerm, setLocationTerm } = useContext(SearchContext);

    // ✅ useMemo en vez de useCallback
    const debouncedSearch = useMemo(() => {
        return debounce((searchTerm, locationTerm) => {
            setSearchTerm(searchTerm);
            setLocationTerm(locationTerm);
        }, 200);
    }, [setSearchTerm, setLocationTerm]);

    // ✅ Limpieza para evitar memory leaks
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            const updatedForm = { ...prev, [name]: value };
            debouncedSearch(updatedForm.searchTerm, updatedForm.locationTerm);
            return updatedForm;
        });
    };

    const handleSearch = () => {
        setSearchTerm(form.searchTerm);
        setLocationTerm(form.locationTerm);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div className="search-input-container">

                    <input
                        type="text"
                        name="searchTerm"
                        className="search-input"
                        placeholder="Empleo..."
                        value={form.searchTerm}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="locationTerm"
                        className="location-input"
                        placeholder="Provincia, Ciudad, Región, Zona, etc"
                        value={form.locationTerm}
                        onChange={handleChange}
                    />

                    <button className="search-btn" onClick={handleSearch}>
                        Buscar
                    </button>

                </div>
            </div>
        </div>
    );
}
