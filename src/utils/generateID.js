const generateID = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomChar = letter[Math.floor(Math.random() * 26)] + letter[Math.floor(Math.random() * 26)];
    return `${randomChar}${randomNum}`
}
export default generateID;