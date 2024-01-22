import React, { useEffect, useRef } from "react"
import { IDataFromGouv, IMoisIndices } from "../types";
import { ephemeride } from "../models/Ephemeride";
import { createDaysOfWeek, createHtmlElement, getFirstDayOfMonth } from "../utils/htlm";
import { openPopup } from "../utils/myAlert";

interface CalendarProps {
    annee: number | undefined;
    calendarData: IDataFromGouv | undefined;
}

function checkRentree(jourDate: Date, conges: IDataFromGouv) {
    const jourDateFormat = `${String(jourDate.getDate()).padStart(2, '0')}/${String(jourDate.getMonth() + 1).padStart(2, '0')}/${jourDate.getFullYear()}`;

    const rentreeEleve = conges.rentree_scolaire.data.some(e => e.date_de_rentree_eleve === jourDateFormat);

    const rentreeEnseignant = conges.rentree_scolaire.data.some(e => e.date_de_rentree_enseignant === jourDateFormat);

    if (rentreeEleve) {
        return {
            date: jourDateFormat,
            type: 'Élèves'
        };
    }
    if (rentreeEnseignant) {
        return {
            date: jourDateFormat,
            type: 'Enseignants'
        };
    }

    return null;
}


const Calendar: React.FC<CalendarProps> = ({ annee, calendarData }) => {

    const visibilityCalendarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        renderCalendar();
    }, [annee, calendarData]);




    const renderCalendar = () => {
        if (annee !== undefined && calendarData !== undefined) {

            if (visibilityCalendarRef.current !== null) {
                visibilityCalendarRef.current.innerHTML = '';

                const moisIndices: IMoisIndices = {
                    "Janvier": 0,
                    "Février": 1,
                    "Mars": 2,
                    "Avril": 3,
                    "Mai": 4,
                    "Juin": 5,
                    "Juillet": 6,
                    "Août": 7,
                    "Septembre": 8,
                    "Octobre": 9,
                    "Novembre": 10,
                    "Décembre": 11
                };
                const moisOrdre = [
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                ];

                let anneeMois: number;
                let moisIndex: number;

                moisOrdre.forEach((mois: string, moisOrdreIndex: number) => {

                    const jours = ephemeride[mois];
                    if (moisOrdreIndex === 12) {
                        moisIndex = moisIndices[mois];
                        anneeMois = annee + 1;
                    } else {
                        moisIndex = moisIndices[mois];
                        anneeMois = moisIndex >= 7 ? annee : annee + 1;
                    }

                    const moisDiv = createHtmlElement('div', 'bg-white shadow overflow-hidden rounded-lg mb-6', '');
                    const moisHeader = createHtmlElement('div', 'px-4 py-5 sm:px-6 border-b border-gray-200 text-lg font-medium text-gray-900', mois + ' ' + anneeMois);
                    moisDiv.appendChild(moisHeader);

                    // Ajouter les jours de la semaine sous le titre du mois
                    const daysOfWeekDiv = createDaysOfWeek();
                    moisDiv.appendChild(daysOfWeekDiv);

                    // Déterminer le premier jour du mois
                    const firstDayOfMonth = getFirstDayOfMonth(anneeMois, moisIndex);
                    const gridDiv = createHtmlElement('div', 'grid grid-cols-7 gap-4 p-4 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7', '');

                    // Ajouter des jours du mois précédent si nécessaire
                    if (firstDayOfMonth !== 1) { // 1 représente Lundi
                        const daysToAdd = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
                        for (let i = 0; i < daysToAdd; i++) {
                            const emptyDayDiv = document.createElement('div');
                            gridDiv.appendChild(emptyDayDiv);
                        }
                    }

                    jours.forEach((jour, index) => {
                        const jourNum = index + 1;
                        const jourDivClass = "flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white border rounded-lg text-center cursor-pointer hover:bg-gray-100";

                        const jourDiv = createHtmlElement('div', jourDivClass, jourNum.toString());

                        const jourDate: Date = new Date(anneeMois, moisIndex, jourNum);
                        const isJourFerie = calendarData.jours_feries.find(j => j.dte.getDate() === jourNum && j.dte.getMonth() === moisIndex);
                        const rentreeInfo = checkRentree(jourDate, calendarData); // Fonction à créer pour vérifier les jours de rentrée

                        if (isJourFerie) {
                            jourDiv.classList.add('border-2', 'border-red-500', 'bg-red-200', 'bg-red-200', 'text-red-800');
                        } else if (rentreeInfo) {
                            console.log("rentreeInfo", rentreeInfo?.date);
                            console.log("jourDiv", jourDiv)
                            jourDiv.classList.add('border-2', 'border-blue-500', 'bg-blue-200', 'text-blue-800');
                        }

                        // Vérifier si c'est un jour de vacances
                        const inVacationPeriod = calendarData.vacances.some(v => {
                            const startDate = new Date(v.start_date);
                            const endDate = new Date(v.end_date);
                            endDate.setDate(endDate.getDate() - 1); // Les vacances s'arrêtent à date de fin -1
                            return jourDate >= startDate && jourDate <= endDate;
                        });

                        if (inVacationPeriod) {
                            jourDiv.classList.add('border-2', 'border-green-500');
                        }

                        jourDiv.onclick = () => {
                            let popupText = `${jourNum}: ${jour[1]} ${jour[0]}`;
                            if (rentreeInfo) {
                                popupText += ` / Rentrée scolaire : ${rentreeInfo.type}`;
                            }
                            openPopup(popupText);
                        }

                        gridDiv.appendChild(jourDiv);
                    });

                    moisDiv.appendChild(gridDiv);
                    visibilityCalendarRef.current?.appendChild(moisDiv);

                })
            }
        }
    }

    return (
        (annee !== undefined && calendarData !== null) && (
            <div ref={visibilityCalendarRef} className="flex flex-row flex-wrap justify-center gap-4 mt-8"></div>
        )
    );
}

export default Calendar
