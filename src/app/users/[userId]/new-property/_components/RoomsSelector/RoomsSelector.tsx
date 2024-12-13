'use client';

import clsx from 'clsx';
import { z } from 'zod';

import { Control, Controller } from 'react-hook-form';

import { RoomsSchema } from '~/lib/FormSchema';

import styles from './RoomsSelector.module.css';

type RoomSelectorProps = {
    control: Control<any>;
};

type RoomType = keyof z.infer<typeof RoomsSchema>;

const rooms = Object.keys(RoomsSchema.shape) as RoomType[];

const getNumberOfRooms = (room: RoomType) => {
    switch (room) {
        case 'Bedrooms':
            return [1, 2, 3, 4, 5, 6, 7, '7+'];
        case 'Bathrooms':
            return [1, 2, 3, 4, 5, 6, '6+'];
        case 'Servant Quarters':
            return [1, 2, '2+'];
        case 'Kitchen':
            return [1, 2, '2+'];
        case 'Store Rooms':
            return [1, 2, '2+'];
        case 'Drawing Room':
            return [1, 2, '2+'];
    }
};

export default function RoomSelector({ control }: RoomSelectorProps) {
    return (
        <div className={styles.container}>
            {rooms.map((roomType) => (
                <Controller
                    key={roomType}
                    name={roomType}
                    control={control}
                    render={({ field }) => (
                        <div className={styles.field_wrapper}>
                            <label htmlFor={roomType} className={styles.label}>
                                {roomType}:
                            </label>
                            <div className={styles.options_wrapper}>
                                {getNumberOfRooms(roomType).map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => field.onChange(num)}
                                        className={clsx(
                                            styles.option,
                                            field.value === num &&
                                                styles.active,
                                        )}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                />
            ))}
        </div>
    );
}
