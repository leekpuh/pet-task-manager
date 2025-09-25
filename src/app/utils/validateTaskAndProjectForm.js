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
    } 
    if (startDate >= endDate) {
         errors.push("Дата начала не может быть позднее или равна дате окончания");
    }
    if (new Date(endDate) < new Date()) {
         errors.push(`Дата окончания ${cardType} не может быть прошедшей датой`);
    }
    if (title.length > 70) {
        errors.push(`Название ${cardType} не может быть более 70 символов`);
    } 
    return errors.length > 0 ? errors : null
}
