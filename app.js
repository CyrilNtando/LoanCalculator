//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //hide results
  document.getElementById("results").style.display = "none";
  //show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

//calculate Results
function calculateResults() {
  //prevent default behaviour

  //UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const TotalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedIterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calculatedIterest, calculatedPayments);
  const monthly = (principal * x * calculatedIterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    TotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //show result
    document.getElementById("results").style.display = "block";
    //hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your Number");
    //hide loader
    document.getElementById("loading").style.display = "none";
  }
}

function showError(error) {
  //Create element
  const errorDiv = document.createElement("div");
  //get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  //add class
  errorDiv.className = "alert alert-danger";

  //create textNode and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);
  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
