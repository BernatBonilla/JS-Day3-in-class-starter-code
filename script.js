//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
// 3. After step 2, console log your const and then try to console.log parts of the object
// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object


// Minimal, working ES6 class + render + add


function Employee(firstName, lastName, email, birthdate, salary) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.birthdate = birthdate;
  this.salary = salary;
}

// Method to edit an employee
Employee.prototype.editEmployee = function (updates) {
  Object.assign(this, updates);
};

// Method to GET a readable string of this employee
Employee.prototype.getInfo = function () {
  return this.firstName + " " + this.lastName + " — " + this.email + " — " + this.birthdate;
};

// Array of employees
var employees = [
  new Employee("John", "Doe", "johndoe@example.com", "1999-12-31", 80000),
  new Employee("Jane", "Smith", "janesmith@example.com", "2015-09-01", 75000),
  new Employee("Alex", "Lee", "alex.lee@example.com", "1995-05-10", 70000)
];

// Class-level ADD helper (creates & pushes a new Employee into the global list)
Employee.addEmployee = function (firstName, lastName, email, birthdate, salary) {
  var e = new Employee(firstName, lastName, email, birthdate, salary);
  employees.push(e);
  return e;
};

// Show employees in the table
function renderEmployees() {
  var tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < employees.length; i++) {
    var row = "<tr>" +
      "<td>" + employees[i].firstName + "</td>" +
      "<td>" + employees[i].lastName + "</td>" +
      "<td>" + employees[i].email + "</td>" +
      "<td>" + employees[i].birthdate + "</td>" +
      "</tr>";
    tbody.innerHTML += row;
  }
}
renderEmployees();

// Add employee from form
var btn = document.getElementById("myFormButton");
btn.addEventListener("click", function (e) {
  e.preventDefault();

  var fn = document.getElementById("first_name").value;
  var ln = document.getElementById("last_name").value;
  var em = document.getElementById("email").value;
  var bd = document.getElementById("birthdate").value;

  if (fn && ln && em && bd) {
    var newEmp = new Employee(fn, ln, em, bd, 0);
    employees.push(newEmp);
    renderEmployees();
  }
});

// Part 2: Async Challenges

// A) Callback
function verifyPaymentCallback(orderTotal, onSuccess, onError) {
  setTimeout(function () {
    if (orderTotal < 5000) onSuccess("Payment approved: " + orderTotal);
    else onError("Needs manager approval: " + orderTotal);
  }, 500);
}

// B) Promise
function verifyPaymentPromise(orderTotal) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (orderTotal < 5000) resolve("Payment approved: " + orderTotal);
      else reject("Needs manager approval: " + orderTotal);
    }, 500);
  });
}

//C) Async/Await 
async function runPayments() {
  try {
    var result1 = await verifyPaymentPromise(3000);
    console.log(result1);
    var result2 = await verifyPaymentPromise(6000);
    console.log(result2); 
  } catch (err) {
    console.error(err);
  }
}