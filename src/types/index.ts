export interface IVacances {
    description: string;
    annee_scolaire: string;
    end_date: string;
    location: string;
    population: string;
    start_date: string;
    zones: string;
}

export interface IJoursFeries {
    name: string;
    dte: Date;
}

export interface IRentreeScolaire {
    academie: string;
    data: {
        periode: string;
        date_de_rentree_eleve: string;
        date_de_rentree_enseignant: string;
    }[]
}

export interface IDataFromGouv {
    vacances: IVacances[];
    jours_feries: IJoursFeries[];
    rentree_scolaire: IRentreeScolaire;
}

export interface IMoisAvecJours {
    [mois: string]: string[][];
}

export interface IEphemeride {
    Janvier: [
        [string, string]
    ];
    Février: [
        [string, string]
    ];
    Mars: [
        [string, string]
    ];
    Avril: [
        [string, string]
    ];
    Mai: [
        [string, string]
    ];
    Juin: [
        [string, string]
    ];
    Juillet: [
        [string, string]
    ];
    Août: [
        [string, string]
    ];
    Septembre: [
        [string, string]
    ];
    Octobre: [
        [string, string]
    ];
    Novembre: [
        [string, string]
    ];
    Décembre: [
        [string, string]
    ];
}

export interface IMoisIndices {
    [key: string]: number;
    Janvier: number;
    Février: number;
    Mars: number;
    Avril: number;
    Mai: number;
    Juin: number;
    Juillet: number;
    Août: number;
    Septembre: number;
    Octobre: number;
    Novembre: number;
    Décembre: number;
}