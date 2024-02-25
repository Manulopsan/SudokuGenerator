export const moveElementsOnePosition = (dataArray) =>{
    let temp = 0
    dataArray.map((element,index)=>{
        if(index===dataArray.length-1){
            temp = element
            dataArray[index]=dataArray[0]
            dataArray[dataArray.length-1] = temp
        }else{
            temp = element
            dataArray[index] = dataArray[index+1]
            dataArray[index+1] = temp
        }})
    return dataArray
}