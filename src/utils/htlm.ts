export const createHtmlElement = (tag: string, classes: string, text: string = '') => {
    const element = document.createElement(tag);
    element.className = classes;
    element.textContent = text;
    return element;
}

export const createDaysOfWeek = () => {
    const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const daysOfWeekDiv = document.createElement('div');
    daysOfWeekDiv.className = 'grid grid-cols-7 text-center font-bold';

    jours.forEach(jour => {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = jour;
        daysOfWeekDiv.appendChild(dayDiv);
    });

    return daysOfWeekDiv;
}

export const getFirstDayOfMonth = (annee: number, mois: number) => {
    return new Date(annee, mois, 1).getDay();
}