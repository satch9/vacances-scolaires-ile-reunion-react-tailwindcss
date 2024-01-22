export function isYearValid(year: number) {
    if (!year) return false;

    return (
        !isNaN(year) &&
        String(year).length === 4 &&
        year > 1900 &&
        year <= new Date().getFullYear() + 1
    );
}