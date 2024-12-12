'use client';

import { useEffect, useState } from 'react';
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { cities } from '~/utils/Cities';

import styles from './SelectCity.module.css';

interface City {
    value: string;
    name: string;
}

interface SelectLocationProps {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
    placeholder?: string;
}

const SelectCity = ({
    placeholder,
    register,
    watch,
    setValue,
}: SelectLocationProps) => {
    const [filteredCities, setFilteredCities] = useState<City[]>(cities);
    const [isOpen, setIsOpen] = useState(false);

    const selectedCity = watch('city');

    // Filter cities based on search query
    useEffect(() => {
        const filtered = cities.filter((city) =>
            city.name.toLowerCase().includes(selectedCity?.toLowerCase() || ''),
        );
        setFilteredCities(filtered);
    }, [selectedCity]);

    const handleSelect = (city: City) => {
        setValue('city', city.name, { shouldValidate: true });
        setIsOpen(false);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                {...register('city', { required: true })}
                onFocus={() => setIsOpen(true)}
                onBlur={() => {
                    // Allow time for click to register on options
                    setTimeout(() => {
                        setIsOpen(false);
                    }, 200);
                }}
                onClick={() => setIsOpen(true)}
                placeholder={placeholder}
                className={styles.input}
                aria-label="Select a city"
                aria-expanded={isOpen}
                role="combobox"
                aria-autocomplete="list"
                aria-controls="city-list"
            />

            {isOpen && (
                <div id="city-list" className={styles.dropdown} role="listbox">
                    {filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                            <div
                                key={city.value}
                                onClick={() => handleSelect(city)}
                                className={styles.dropdownItem}
                                role="option"
                                aria-selected={selectedCity === city.name}
                            >
                                {city.name}
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResults}>No cities found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectCity;
