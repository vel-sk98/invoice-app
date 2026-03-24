const calculateDueDate = (createdAt, days) => {
     if (!createdAt) return null;
    const date = new Date(createdAt);
    if (isNaN(date)) return null;
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0,10);
};
export default calculateDueDate;