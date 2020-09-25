// Assignment Code
var generateBtn = document.querySelector("#generate");

// Variables
var lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var lettersLower = "abcdefghijklmnopqrstuvwxyz".split("");
var numbers = "0123456789".split("");
var specialChars = "~!@#$%&-+=_".split("");
var passwordLength;


// Determine approved characters
function getCategories() {
  var confirmUpper = confirm("Contain uppercase letters?");
  var confirmLower = confirm("Contain lowercase letters?");
  var confirmNumber = confirm("Contain numbers?");
  var confirmChars = confirm("Contain special characters?");

  // If user doesn't choose any character types...
  if (!confirmUpper && !confirmLower && !confirmNumber && !confirmChars) {
    alert("Must choose at least one character type.")
    // ...go back to line 14
    return;
  }

  // Determine length
  passwordLength = prompt("Choose a character length for your password. (8 - 128)");

  // If user enters number outside range, or NaN...
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength) === true) {
    alert("Invalid entry.")
    // ...reprompt for length
    passwordLength = prompt("Choose a character length for your password. (8 - 128)");
  }
  console.log(passwordLength);

  // Create an object of our length and approved character types
  var passwordCategories = {
    length: passwordLength,
    confirmUpper: confirmUpper,
    confirmLower: confirmLower,
    confirmNumber: confirmNumber,
    confirmChars: confirmChars
  }

  // Return this object
  return passwordCategories;
}


// Declaring a function that, when invoked, will return a random character from a specified character array
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var element = arr[randIndex]
  return element;
}


// Generate Password
function generatePassword() {
  var options = getCategories();
  var results = [];
  var approvedChars = [];
  var guaranteedChars = [];

  // Add User-approved character types to the array of approvedChars, and guarantee one of each
  if (options.confirmUpper) {
    approvedChars = approvedChars.concat(lettersUpper);
    guaranteedChars.push(getRandom(lettersUpper));
  }
  if (options.confirmLower) {
    approvedChars = approvedChars.concat(lettersLower);
    guaranteedChars.push(getRandom(lettersLower));
  }
  if (options.confirmNumber) {
    approvedChars = approvedChars.concat(numbers);
    guaranteedChars.push(getRandom(numbers));
  }
  if (options.confirmChars) {
    approvedChars = approvedChars.concat(specialChars);
    guaranteedChars.push(getRandom(specialChars));
  }
  
  for (var i = 0; i < options.length; i++) {
    results.push(getRandom(approvedChars))
  }
  for (var i = 0; i < guaranteedChars.length; i++) {
    results[i] = guaranteedChars[i];
  }

  // Return a string version of the generated characters
  return results.join("");
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
