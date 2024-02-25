export const getInitialRow = (numBlock) =>{
    if(numBlock==0 || numBlock == 1 || numBlock ==2){
        return 1
    }else if(numBlock==3 || numBlock==4 || numBlock==5){
        return 4
    }else return 7
}