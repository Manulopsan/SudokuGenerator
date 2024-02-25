export const updateControls = (dataControl, row, number )=>{
    dataControl[row].map((element,index) => {
        if(element===number){
            dataControl[row][index]=0
        }
       })
    return dataControl
}