import React, { useState } from "react"
import { isYearValid } from "../utils/validator";

interface Props {
    setAnnee: (annee: number) => void;
}

const DateForm: React.FC<Props> = ({ setAnnee }) => {
    const [nouvelleAnnee, setNouvelleAnnee] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedValue = parseInt(nouvelleAnnee);
        if (isYearValid(parsedValue)) {
            setAnnee(parsedValue); // Appel de setAnnee lors de la soumission
        } else {
            alert("Merci d'entrer une année valide (un nombre à quatre chiffres)");
        }
    };

    return (
        <div className='flex justify-center w-full'>
            <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4" id="form">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="annee">
                        Saisir une année
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                        type="text"
                        value={nouvelleAnnee}
                        id="annee"
                        onChange={(e) => setNouvelleAnnee(e.target.value)}
                        placeholder="Format YYYY"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Calendrier
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DateForm
