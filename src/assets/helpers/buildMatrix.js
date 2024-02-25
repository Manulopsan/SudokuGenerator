export const buildMatrix = (numRows,numColumns) =>{
    let matrixControl = []
        for(let i=0;i<numRows;i++){
            matrixControl[i] = Array.from({length:numColumns}, (_,i)=> i+1)
        }
        return matrixControl
}