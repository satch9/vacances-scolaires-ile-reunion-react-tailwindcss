import { useEffect, useState } from 'react';
import { getData } from '../models/GetData';
import { IDataFromGouv } from '../types';

import Title from './Title'
import DateForm from './DateForm'
import Calendar from './Calendar'

const Container = () => {
    const [title, setTitle] = useState<string>("");
    const [annee, setAnnee] = useState<number | undefined>(undefined);
    const [calendarData, setCalendarData] = useState<IDataFromGouv | undefined>(undefined);
    const str: string = "à l'île de la";


    useEffect(() => {
        if (annee !== undefined) {
            getData(annee)
                .then((result: IDataFromGouv) => {
                    if (result !== null) {
                        const newTitle = `${str[0].toUpperCase()}${str.slice(1)} ${result.vacances[0].location} pour l'année scolaire ${result.vacances[0].annee_scolaire}`;
                        setTitle(newTitle);
                        setCalendarData(result)
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [annee]);

    return (
        <div className="flex flex-col justify-center items-center ">
            <Title title={title} />

            <DateForm setAnnee={setAnnee} />

            <Calendar annee={annee} calendarData={calendarData} />

        </div>
    )
}

export default Container
