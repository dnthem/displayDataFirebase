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
            default:
                orderInfo.innerHTML += `${key} : ${order[key]} <br>`;
        }
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
