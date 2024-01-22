import { IDataFromGouv } from "../types";

export const getData = async (annee: number) => {
    const data: IDataFromGouv = {
        vacances: [],
        jours_feries: [],
        rentree_scolaire: {
            academie: "Ile de la Réunion",
            data: [{
                periode: "2021-2022",
                date_de_rentree_eleve: "16/08/2021",
                date_de_rentree_enseignant: "13/08/2021"
            }, {
                periode: "2022-2023",
                date_de_rentree_eleve: "16/08/2022",
                date_de_rentree_enseignant: "12/08/2022"
            }, {
                periode: "2023-2024",
                date_de_rentree_eleve: "17/08/2023",
                date_de_rentree_enseignant: "16/08/2023"
            },
            {
                periode: "2024-2025",
                date_de_rentree_eleve: "19/08/2024",
                date_de_rentree_enseignant: "16/08/2024"
            },
            {
                periode: "2025-2026",
                date_de_rentree_eleve: "19/08/2025",
                date_de_rentree_enseignant: "18/08/2025"
            },
            ]
        }
    }



    //console.log("année", annee);

    const JourAn = new Date(annee + 1, 0, 1)
    const FeteTravail = new Date(annee + 1, 4, 1)
    const Victoire1945 = new Date(annee + 1, 4, 8)
    const FeteNationale = new Date(annee + 1, 6, 14)
    const Assomption = new Date(annee + 1, 7, 15)
    const Toussaint = new Date(annee, 10, 1)
    const Armistice = new Date(annee, 10, 11)
    const FeteCaf = new Date(annee, 11, 20)
    const Noel = new Date(annee, 11, 25)

    const G = (annee + 1) % 19
    const C = Math.floor((annee + 1) / 100)
    const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    const I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    const J = ((annee + 1) * 1 + Math.floor((annee + 1) / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    const L = I - J
    const MoisPaques = 3 + Math.floor((L + 40) / 44)
    const JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    const Paques = new Date(annee + 1, MoisPaques - 1, JourPaques)
    const VendrediSaint = new Date(annee + 1, MoisPaques - 1, JourPaques - 2)
    const LundiPaques = new Date(annee + 1, MoisPaques - 1, JourPaques + 1)
    const Ascension = new Date(annee + 1, MoisPaques - 1, JourPaques + 39)
    const Pentecote = new Date(annee + 1, MoisPaques - 1, JourPaques + 49)
    const LundiPentecote = new Date(annee + 1, MoisPaques - 1, JourPaques + 50)

    await fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=annee_scolaire%3D%22${annee}-${annee + 1}%22&rows=30&sort=start_date&facet=description&facet=population&facet=start_date&facet=end_date&facet=zones&refine.zones=R%C3%A9union&timezone=Indian%2FReunion`)
        .then((resp) => resp.json())
        .then((resp) => {

            //console.log('resp', resp)

            for (const key in resp) {
                //console.log(resp[key])

                if (Array.isArray(resp[key])) {
                    resp[key].forEach((element: {
                        fields: {
                            description: string, annee_scolaire: string,
                            end_date: string,
                            location: string,
                            population: string,
                            start_date: string,
                            zones: string
                        }
                    }) => {
                        if (element.fields) {
                            //console.log("element", element.fields)
                            if (element.fields.description === "Vacances après 1ère période") {
                                data.vacances[0] = (element.fields)
                            }
                            if (element.fields.description === "Vacances d'Été austral") {
                                data.vacances[1] = (element.fields)
                            }
                            if (element.fields.description === "Vacances après 3ème période") {
                                data.vacances[2] = (element.fields)
                            }
                            if (element.fields.description === "Vacances après 4ème période") {
                                data.vacances[3] = (element.fields)
                            }
                            if (element.fields.description === "Vacances d'Hiver austral") {
                                data.vacances[4] = (element.fields)
                            }

                        }
                    })
                }
            }


            data.jours_feries.push({
                name: "Toussaint",
                dte: Toussaint
            });
            data.jours_feries.push({
                name: "Armistice",
                dte: Armistice
            });
            data.jours_feries.push({
                name: "Fête Caf",
                dte: FeteCaf
            });
            data.jours_feries.push({
                name: "Noël",
                dte: Noel
            });

            data.jours_feries.push({
                name: "Jour de l'An",
                dte: JourAn
            });
            data.jours_feries.push({
                name: "Vendredi Saint",
                dte: VendrediSaint
            })
            data.jours_feries.push({
                name: "Pâques",
                dte: Paques
            });
            data.jours_feries.push({
                name: "Lundi de Pâques",
                dte: LundiPaques
            });
            data.jours_feries.push({
                name: "Fête du travail",
                dte: FeteTravail
            });
            data.jours_feries.push({
                name: "Victoire de 1945",
                dte: Victoire1945
            });
            data.jours_feries.push({
                name: "Ascension",
                dte: Ascension
            });
            data.jours_feries.push({
                name: "Pentecôte",
                dte: Pentecote
            });
            data.jours_feries.push({
                name: "Lundi de Penteôte",
                dte: LundiPentecote
            });
            data.jours_feries.push({
                name: "Fête Nationale",
                dte: FeteNationale
            });
            data.jours_feries.push({
                name: "Assomption",
                dte: Assomption
            });


        })
        .catch((error) => console.log(error))

    //console.log("data", data)
    return data;
}