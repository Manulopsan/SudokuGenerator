import {shuffleArray} from './assets/helpers/shuffleArray'
import {getInitialRow} from './assets/helpers/getInitialRow'
import {getInitialCol} from './assets/helpers/getInitialCol'
import {buildControlBoard} from './assets/helpers/buildControlBoard'
import {buildMatrix} from './assets/helpers/buildMatrix'
import {moveElementsOnePosition} from './assets/helpers/moveElementsOnePosition'
import {eraseValue} from './assets/helpers/eraseValue'
import {checkAvailableNumber} from './assets/helpers/checkAvailableNumber'
import {updateControls} from './assets/helpers/updateControls'
import { useState } from 'react'
import './App.css'


function App() {
  
  //Build a Sudoku board with 0 (number)
 const emptyBoard = Array.from(Array(9),_=>Array(9).fill(0))

  let [sudokuBoard,setBoard] = useState(emptyBoard)

  const buildSudokuBoard = () =>{
    const timeStart = Date.now()
    //**** FIRST - EMPTY THE BOARD */
    const emptyBoard = Array.from(Array(9),_=>Array(9).fill(0))
    emptyBoard.map((element,index)=>{sudokuBoard[index]=[...element]})
    setBoard([...emptyBoard])

    let controlProcess = true

    //build 9 blocks with 9 random numbers from 1 to 9 without duplicated
    //For each number check if it is duplicate in this row and in this column
    //First, create a copy of NUMBERS_CHECK to avoid duplicate numbers
    const NUMBERS_CHECK = [1,2,3,4,5,6,7,8,9]

    //Build rowsControl and columnsControl
    let rowsControl = buildMatrix(9,9)
    let columnsControl = buildMatrix(9,9)

    //Build an object where each position has a key (row and column of Sudoku board) and a value with
    //an array with 9 posible numbers for that position of the board
    let controlBoard = buildControlBoard(9,9)

    //Create a copy of controlBoard because it can be neccesary to rebuild the previus block again
    let controlBoardCopy = structuredClone(controlBoard)

    let tempSudokuBoard = []
    let tempRowsControl = []
    let tempColumnsControl = []

    for(let block=0;block<9;block++){
      //To control execution process
      const timeUpdate = Date.now()
      if((timeUpdate-timeStart)>15000){
        break
      }

      if(!controlProcess){
        //It´s necessary to go back to previus block
        block=block-1
        //Re-building sudokuBoard
        tempSudokuBoard.map((element,index) => sudokuBoard[index]=[...element])
        //Re-bulding controlBoard
        controlBoard = structuredClone(controlBoardCopy)
        //Re-building rowsControl and columnsControl
        tempRowsControl.map((element,index) => rowsControl[index]=[...element])
        tempColumnsControl.map((element,index) => columnsControl[index]=[...element])
      }else{
        //Copy controlBoard because it can be neccesary to rebuild the previus block again
        controlBoardCopy = structuredClone(controlBoard)
        //Update tempSudokuBoard
        sudokuBoard.map((element,index) => tempSudokuBoard[index]=[...element])
        //Update tempRowsControl and tempColumnsControl
        rowsControl.map((element,index) => tempRowsControl[index]=[...element])
        columnsControl.map((element,index) => tempColumnsControl[index]=[...element])  
      }
      //Copy current sudokuBoard before building next block of the board
      sudokuBoard.map((element,index) => tempSudokuBoard[index]=[...element])

      //Loop each element of the sudoku board
      const initialRow = getInitialRow(block)
      const initialCol = getInitialCol(block)

      //Shuffle availableNumbers array
      let randomAvailableNumbers = shuffleArray([...NUMBERS_CHECK])

      console.log('Calculado....')

      //Loop the positions for each block
      for(let row=initialRow;row<=(initialRow+2);row++){
        for(let col=initialCol;col<=(initialCol+2);col++){
          //For each position [row,col] it´s neccesary to check if the number of randomAvailableNumbers array is available
          //in the values of object controlBoard for the following positions:
          // ROW =>  [i][j from 1 to 9] // COL => [i from 1 to 9][j]
          //Use a controProcess [boolean] to check if any number is valid to insert in the board, then it is necessary
          //to go back to previus block
          controlProcess = true
          //Count the loops
          let count = 0

          while(!checkAvailableNumber(randomAvailableNumbers[0],row-1, col-1, rowsControl, columnsControl) & controlProcess){
            //Move one position towards left, the elements of randomAvailableNumbers array
            randomAvailableNumbers = moveElementsOnePosition(randomAvailableNumbers)
            count = count + 1
            if(count >randomAvailableNumbers.length){
              controlProcess=false
              break
            }
          }

          //If there is no number that fits in this cell, we return to previous block
          if(!controlProcess){
            break
          }

          //Insert number in sudokuBoard [position=> row,col]
          sudokuBoard[row-1][col-1] = randomAvailableNumbers[0]

          //Update rowsControl and ColumnsControl
          updateControls(rowsControl,row-1,randomAvailableNumbers[0])
          updateControls(columnsControl,col-1,randomAvailableNumbers[0])
  
          //Eliminate the number in related positions of controlBoard object
          controlProcess=true

          if(!eraseValue(randomAvailableNumbers[0],row, col, controlBoard)){
            //If an array is empty then the process shoul be stopped and go back to previus block
            controlProcess = false
          }
          randomAvailableNumbers.splice(0,1)

          //If there is no number that fits in this cell, we return to previous block
          if(!controlProcess){
            break
          }
        }
        //If there is no number that fits in this cell, we return to previous block
        if(!controlProcess){
          break
        }
      }
    setBoard([...sudokuBoard])
    }
    console.log('Finalizado')
  }

  return (
    <>
      <h1>SUDOKU</h1>
      <button onClick={()=>buildSudokuBoard()}>Generar Sudoku</button>
      <div className='board-container'>
        <div className='row'>
        {sudokuBoard[0].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[1].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[2].map((item,col)=> {return(<div className={`horizontal-solid ${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[3].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[4].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[5].map((item,col)=> {return(<div className={`horizontal-solid ${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[6].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[7].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
        <div className='row'>
        {sudokuBoard[8].map((item,col)=> {return(<div className={`${(col==2 || col==5)? 'digit solid':'digit dash'}`}>{item}</div>)})}
        </div>
      </div>
    </>
  )
}

export default App
