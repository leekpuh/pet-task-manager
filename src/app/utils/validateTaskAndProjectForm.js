export default function validateTaskAndprojectForm( {title, startDate, endDate}, type) {
const errors = []
const cardType = type === "задача" ? "задачи" : "проекта"
    if (!title || title.trim() === "") {
        errors.push(`Укажите название ${cardType}`);
    }
    if (!startDate) {
        errors.push(`Укажите дату начала ${cardType}`);
    }
    if (!endDate) {
        errors.push(`Укажите дату окончания ${cardType}`);
    }
    if (!endDate) {
        errors.push(`Укажите дату окончания ${cardType}`);
    } if (startDate >= endDate) {
         errors.push("Дата начала не может быть позднее или равна дате окончания");
    }
    if (new Date(startDate) < new Date() && new Date(endDate) < new Date()) {
         errors.push(`Дата начала или окончания ${cardType} не может быть прошедшей датой`);
    }
    return errors.length > 0 ? errors : null
}
