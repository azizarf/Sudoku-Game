class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }


  getCol(index) {
    const result = [];
    for (let i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }


  generateBoard() {
    const hardPuzzle = [
      ["", "", 2, "", "", "", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ]

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
    
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    const result = [];
    const boxRowStart = rowIndex - (rowIndex % 3);
    const boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index){
    const result=[]
    const startingRow = Math.floor(index / 3) * 3;
    const startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;

  }
/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */

/*=========================================================================
=                 TODO: fill in these Checker Functions                    =
=========================================================================*/

  rowSafe(row, num) {
    var rows=this.getRow(row)
     return !rows.includes(num)
    //check if the row contains num

  }

  colSafe(col, num) {
    //check if the column contains num
    var cols=this.getCol(col)
    return !cols.includes(num)
  }

  boxSafe(row, col, num) {
    var boxs=this.getBox(row,col)
    return !boxs.includes(num)
    //check if the box contains num
  }

  rowValidAt(rowIndex) {
    var rows=this.getRow(rowIndex)
   
     var counter=1
    for(var i=0;rows.length>i;i++){
      for(var j=1+i;rows.length>j;j++){
      
        if(rows[i]===rows[j] && rows[i]!==0 && rows[i]!=='' ){
          
        
          counter++
        }
      }
    }
    if(counter>1){
      return false 
    }
    return true 
  }
  

   //check if a row is valid at a given index
  

  colValidAt(colIndex) {
     var cols=this.getCol(colIndex)
  
     var counter=1
    for(var i=0;cols.length>i;i++){
      for(var j=1+i;cols.length>j;j++){
       
        if(cols[i]===cols[j] && cols[i]!==0 && cols[i]!=='' ){
          
        
          counter++
        }
      }
    }
    if(counter>1){
      return false 
    }
    return true 
  }
    //check if a column is valid at a given index
  

  boxValidAt(boxIndex) {
    var boxs=this.getBoxByIndex(boxIndex)
    
     var counter=1
    for(var i=0;boxs.length>i;i++){
      for(var j=1+i;boxs.length>j;j++){
        
        if(boxs[i]===boxs[j] && boxs[i]!==0 && boxs[i]!=='' ){
          
         
          counter++
        }
      }
    }
    if(counter>1){
      return false 
    }
    return true 
  }


    //check if a box is valid at a given index
  

  allRowsValid() {
   var counter=0
    for(var i=0;9>i;i++){
      if(this.rowValidAt(i)){
        counter++
      }
    }
    if(counter>7){
      return true 
    }
  return false 
    //check if all the rows in the board are valid
  }
  allColsValid() {
    var counter=0
    for(var i=0;9>i;i++){
      if(this.colValidAt(i)){
        counter++
      }
    }
    if(counter>7){
      return true 
    }
  return false 
    //check if all the columns in the board are valid
  }
  allBoxesValid() {
    for(var i=0;9>i;i++){
      if(!this.boxValidAt(i)){
     return false
      }
    }
  return true 
    //check if all the boxes in the board are valid
  }

  validBoard() {
    return this.allBoxesValid() && this.allColsValid() && this.allRowsValid();
  }

  isSafe(row, col, num) {
    return  this.rowSafe(row, num) && this.colSafe(col, num) && this.boxSafe(row, col, num);
  }

/*=========================================================================
=                 TODO: fill in these Solver Functions                    =
=========================================================================*/

  solve(row=0,col=0,num=1) {
  if(num>9){
      return false 
    }
  if(col===9){
     col=0
     row++
  }
  if(row===9){
    return true
   }
  if(this.board[row][col]){ 
     return this.solve(row,col+1,num) 
    }
  if(this.isSafe(row,col,num)){
          this.board[row][col]=num
         if(this.solve(row,col+1)) return this.board
         else {
          this.board[row][col] = 0
         }
  }
   return this.solve(row,col,num+1)
}

  solveBoard() {
    while (this.validBoard()) {
      if (this.solve()) {
        this.emit("validBoard", this.board);
        return true
      }
    }
    this.emit("invalidBoard");
    // dont forget to add a small change here ;) 
    return false 

  }

}
