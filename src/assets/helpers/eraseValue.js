export const eraseValue = (value,row,col,controlBoard) =>{
    let valuesRow = []
    for(let i=col+1;i<=9;i++){
        valuesRow.push(row.toString()+i.toString())
    }
    let valuesCol = []
    for(let i=row+1;i<=9;i++){
        valuesCol.push(i.toString()+col.toString())
    }
    for(const key in controlBoard){
        //Check row
        if(valuesRow.includes(key)){
            controlBoard[key].map((number,index)=>{
                if(number===value){
                    controlBoard[key].splice(index,1)
                }
            })
            
            if(controlBoard[key].length===0){
                return false
            }
        }
        //Check col
         if(valuesCol.includes(key)){
            controlBoard[key].map((number,index)=>{
                if(number===value){
                    controlBoard[key].splice(index,1)
                }
            })
            if(controlBoard[key].length===0){
                return false
            }
        }
    }
    return true
}