export const getInitialCol= (numBlock) =>{
    if(numBlock==0 || numBlock == 3 || numBlock ==6){
        return 1
    }else if(numBlock==1 || numBlock==4 || numBlock==7){
        return 4
    }else return 7
}