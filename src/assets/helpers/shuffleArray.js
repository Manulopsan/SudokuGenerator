export const shuffleArray = (dataArray) =>{
    dataArray.sort(() => Math.random() - 0.5);
    return dataArray
}