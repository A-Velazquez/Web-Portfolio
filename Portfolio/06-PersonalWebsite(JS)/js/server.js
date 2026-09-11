// The const for the button to submit
const submitButton = document.getElementById("submitButton");
// Save the form to restart it
const form = document.getElementById("scheduleForm");
// Save the place where the schedule table is
const scheduleTable = document.getElementById("appendSchedule");

function updatingTable(){
    // The constants where the data of the inofrmation will be saved
    const date = document.getElementById("date").value;
    const timeStart = document.getElementById("timeStart").value;
    const timeEnd = document.getElementById("timeEnd").value;
    const activity = document.getElementById("activity").value;
    const place = document.getElementById("place").value;
    const type = document.getElementById("type").value;
    const notes = document.getElementById("notes").value;
    const flag = document.getElementById("flag").value;
    const checkBox = document.getElementById("freeBusy");

    console.log(flag);  
    

    // Give a value if the checkBox is cheked or not
    let checkBoxValue = (checkBox.checked) ? "🟢 Free" : "🔴 Busy"; // This in an if with ternary operation, dunno I wanted to try it

    scheduleTable.innerHTML += `
                <tr style="background-color: ${flag}80;"> <!--The 80 is added for transparency-->
                    <td>${date}</td>
                    <td>${timeStart}</td>
                    <td>${timeEnd}</td>
                    <td>${activity}</td>
                    <td>${place}</td>
                    <td>${type}</td>
                    <td>${notes}</td>
                    <td>${checkBoxValue}</td>
                </tr>    
    `;
}

// The behaviour for the submit button, also preventing is usual behaviour
submitButton.addEventListener("click", (e) => {
    // Prevent the refresh
    e.preventDefault();
    updatingTable();
    // Reset the values of the form
    form.reset()
});

console.log("Running the script");  



