// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGHmglcJ7m46GzjnGh5K_DoiDGSpUk0r8",
    authDomain: "firedata-35982.firebaseapp.com",
    projectId: "firedata-35982",
    storageBucket: "firedata-35982.appspot.com",
    messagingSenderId: "887258467022",
    appId: "1:887258467022:web:e51588365ce98ec8101e9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Update table whenever there are changes in values in Students/orders/
const updateRef = ref(db, 'Orders');
let FLAG_PICK_UP_DATE = false;
let FLAG_PICK_UP_TODAY = false;
let DATE = "";


function init () {
    const flag = localStorage.getItem("Flag");
    const flag2 = localStorage.getItem("Flag2");
    const date = localStorage.getItem("DATE");
    FLAG_PICK_UP_DATE = (flag == "true")? true : false;
    FLAG_PICK_UP_TODAY = (flag2 == "true")? true : false;
    DATE = (date != null)? date : "0";
}

window.addEventListener("load", init);
onValue(updateRef, (snapshot) => {
    let index = 0;
    const data = snapshot.val();
    const table = document.querySelector("#table-content");
    table.innerHTML = `
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Order</th>
        <th>Pick-up Date</th>
        <th>Pick-up Time</th>
        <th>Payment</th>
        <th>Total</th>
        <th>Note</th>
        <th>Status</th>
        <th>Check</th>
    </tr>`;
    for (const key in data) {
        const order = data[key];
            setTable(index, table,order, key);
        index++;
    }
    
});

function setTable (index, table, order, key) {
    if (FLAG_PICK_UP_DATE) {
        if (order["pickUpDate"] != DATE )
            return;
    } 
    if (FLAG_PICK_UP_TODAY) {
        if (order["pickUpDate"] != DATE)
            return;
    } 
    let tr = document.createElement("tr");
    let name = document.createElement("th");
    let phone = document.createElement("th");
    let orderInfo = document.createElement("th");
    let pickUpTime = document.createElement("th");
    let total = document.createElement("th");
    let payment = document.createElement("th");
    let status = document.createElement("th");
    let note = document.createElement("th");
    let check = document.createElement("th");
    let pickUpDate = document.createElement("th");
    for (const key in order) {
        switch (key){
            case "userName":
                name.innerText = order[key];
                break;
            case "userPhone":
                phone.innerText = order[key];
                break;
            case "pickUpDate":
                pickUpDate.innerText = order[key];
                break;
            case "pickUpTime":
                pickUpTime.innerText = order[key];
                break;
            case "total":
                total.innerText = order[key];
                break;
            case "status":
                status.innerHTML = (order[key])? "<p style='color:green;'>complete</p>" : `<p style='color:red;'>pending</p>`;
                break;
            case "payment":
                payment.innerText = order[key];
                break;
            case "status":
                status.innerText = order[key];
                break;
            case "note":
                note.innerText = order[key];
                break;
        }
    }
    let orderList = order["order"];
    for (const dish in orderList)
    {
        orderInfo.innerHTML +=   dish + " : "  + orderList[dish] + "<br>";
    }

    let button = document.createElement("button");
    button.value= key;
    button.innerText = "Finish";
    bindEventFinish(button);
    check.appendChild(button);

    tr.innerHTML = `<th>${index}</th>`;
    tr.appendChild(name);
    tr.appendChild(phone);
    tr.appendChild(orderInfo);
    tr.appendChild(pickUpDate);
    tr.appendChild(pickUpTime);
    tr.appendChild(payment);
    tr.appendChild(total);
    tr.appendChild(note);
    tr.appendChild(status);
    tr.appendChild(check);
    table.appendChild(tr);
}

function bindEventFinish (button) {
    button.addEventListener("click", () => {
        const updates = {};
        updates['/Orders/' + button.value + "/status" ] = true;
        update(ref(db), updates);
    });
}

document.querySelector("#order-by-date").addEventListener("click", () => {
    localStorage.setItem("Flag", "true");
    localStorage.setItem("Flag2", "false");
    localStorage.setItem("DATE",document.querySelector("#pick-up-date").value);
    location.reload();
});

document.querySelector("#reset").addEventListener("click", () => {
    localStorage.setItem("Flag", "false");
    localStorage.setItem("Flag2", "false");
    location.reload();
})

document.querySelector("#order-today").addEventListener("click", () => { 
    localStorage.setItem("Flag", "false");
    localStorage.setItem("Flag2", "true");
    const today = getDate();
    localStorage.setItem("DATE", today);
    location.reload();
});

function getDate () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
}