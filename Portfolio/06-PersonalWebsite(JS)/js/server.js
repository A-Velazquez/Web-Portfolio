// The const for the button to submit
const submitButton = document.getElementById("submitButton");

function updatingTable(){
    // The constants where the data of the inofrmation will be saved
    const date = document.getElementById("date").value;
    const timeStart = document.getElementById("timeStart").value;
    const timeEnd = document.getElementById("timeEnd").value;
    const place = document.getElementById("place").value;
    const type = document.getElementById("type").value;
    const notes = document.getElementById("notes").value;
    const flag = document.getElementById("flag").value;
    const checkBox = document.getElementById("freeBusy");

    // Give a value if the checkBox is cheked or not
    let flagValue = (checkBox.checked) ? "Free" : "Busy"; // This in an if with ternary operation, dunno I wanted to try it
}

console.log("Running the script");


