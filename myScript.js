
let myOps = document.getElementsByClassName("ops");

let display = document.getElementById("display");
let display2 = document.getElementById("display2");
let opNum = "";

let historyArr; // fpr later use
let result = "";
let num = "";
let opPost;

function getNum(val) {
  display.value += val;
  num += val;

  if (opNum.length === 1 || opNum.length === 2) {
    //opNum used to keep track of my operator in the display
    opNum = "12";
  } else if (result != "") display.value = val; //resetting screen when val is inputed over displayed result
  result = "";
}

function getOp(op) {
  
  if (num.length > 0 && opNum.length === 2) {
    getAns();
  }
  
  //condition if result is found and displayed
  if (result != "") {
    num = display.value;
    display.value = display.value + op;

    opPost = display.value.length;
    opNum = "1";
    result = "";
    
  }
  
  // condition for signed values
  if (display.value.length === 0 && (op === "+" || op === "-")) {
    display.value = op;
    num = op;
    
    
  } else if (
    display.value.length > 0 &&
    opNum.length < 2 &&
    display.value.slice(0, 1) != "+" &&
    display.value.slice(0, 1) != "-"
  ) {
    display.value = num + op;
    opPost = display.value.length;//identitying the position of the operator used
    opNum = "1";
    
  } 
 
}

function getAns(value) {
  const ops = ["+", "-", "*", "/"]; //predefined list of operators
  let ans
  let sign = "";
  let displayValues = [];
  let displayOp = "";
  let displayArray = display.value.split("");
  for (i = 0; i < displayArray.length; i++) {

    //Determining what operator is in the equation
    if (i === 0 && (displayArray[i] === "+" || displayArray[i] === "-")) {
    
      //removing the sign if it is added
      sign = displayArray.shift();
    }
    
    if (ops.includes(displayArray[i])) {
      displayOp = displayArray[i];
      displayValues = displayArray.join("").split(displayArray[i]);
      
    }
  }

  switch (
    displayOp //Perfom corrresponding operation according to the various operations provided
  ) {
    case "":
      ans = value;

      break;
    case "/":
      ans = Number(sign + displayValues[0]) / Number(displayValues[1]);
      break;

    case "*":
      ans = Number(sign + displayValues[0]) * Number(displayValues[1]);

      break;

    case "+":
      ans = Number(sign + displayValues[0]) + Number(displayValues[1]);
      break;

    case "-":
      ans = Number(sign + displayValues[0]) - Number(displayValues[1]);

      break;
    default:
      ans = "Error";
  }

  ans = ans.toString();
  if (ans.includes(".")) {
    //round up Answer
    let remainder = ans.slice(ans.indexOf(".") + 1);

    if (remainder.length === 1) {
      ans = Number(ans).toFixed(1);
    } else if (remainder.length === 2) {
      ans = Number(ans).toFixed(2);
    } else if (remainder.length === 3) {
      ans = Number(ans).toFixed(3);
    } else if (remainder.length > 3) {
      ans = Number(ans).toFixed(4);
    }
  }

  if (ans === "NaN") {
    ans = "Error, invalid input!";
  }

  clrBackground();
  clrValues();
  return ans;
}

function del() {
  if (display.value.length === opPost) {
    opNum = "";
    clrBackground();
    display.value = display.value.slice(0, -1);
  } else {
    display.value = display.value.slice(0, -1);
    num = num.slice(0, -1);
  }
}

function clearAll() {
  result = "";
  clrValues();
  clrBackground();
}

function setBackground(n) {
  //changing the operator button color when clicked
  clrBackground();

  myOps[n].style.background = "rgb(0, 195, 255)";
  myOps[n].style.color = "black";
}

function clrBackground() {
  for (var i = 0; i < myOps.length; i++) {
    myOps[i].style.background = "rgb(39, 75, 87)";
    myOps[i].style.color = "rgb(0, 229, 255)"; // Set the text color to blue as an example
  }
}

function clrValues() {
  opNum = "";
  opPost = 0;
  num = "";
  display.value = "";
}


