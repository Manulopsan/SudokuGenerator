export const checkAvailableNumber = (avalaibleNumber, row, col, rowsControl, columnsControl) =>{   
    if(rowsControl[row].includes(avalaibleNumber) && columnsControl[col].includes(avalaibleNumber)){
        //The number can be added to sudoku Board
        return true
    }else{
        //THe number can not be added to sudoku Board
        return false
    }
}