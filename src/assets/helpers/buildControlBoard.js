export const buildControlBoard = (rows,columns) =>{
    const availableNumbers = [1,2,3,4,5,6,7,8,9]
    let controlBoard = {}
    for(let row=1;row<=rows;row++){
        for(let col=1;col<=columns;col++){
            controlBoard[row.toString()+col.toString()]=[...availableNumbers]
        }
    }
    return controlBoard
}