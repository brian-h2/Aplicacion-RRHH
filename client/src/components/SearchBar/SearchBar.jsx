import React, { useState, useMemo, useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from './SearchContext';
import "./SearchBar.css";

export default function SearchBar() {

    const [form, setForm] = useState({
        searchTerm: '',
        locationTerm: '',
        statusTerm: ''
    });

    const { setSearchTerm, setLocationTerm, setStatusTerm } = useContext(SearchContext);

    // ✅ useMemo en vez de useCallback
    const debouncedSearch = useMemo(() => {
        return debounce((searchTerm, locationTerm, statusTerm) => {
            setSearchTerm(searchTerm);
            setLocationTerm(locationTerm);
            setStatusTerm(statusTerm);
        }, 200);
    }, [setSearchTerm, setLocationTerm, setStatusTerm]);

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
            debouncedSearch(updatedForm.searchTerm, updatedForm.locationTerm, updatedForm.statusTerm);
            return updatedForm;
        });
    };

    const handleSearch = () => {
        setSearchTerm(form.searchTerm);
        setLocationTerm(form.locationTerm);
        setStatusTerm(form.statusTerm);
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

                    <select
                        name="statusTerm"
                        className="status-filter"
                        value={form.statusTerm}
                        onChange={handleChange}
                    >
                        <option value="">Estado del trabajo</option>
                        <option value="true">Activo</option>
                        <option value="false">Cerrado</option>
                    </select>

                    <button className="search-btn" onClick={handleSearch}>
                        Buscar
                    </button>

                </div>
            </div>
        </div>
    );
}
