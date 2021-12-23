// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
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
const db = getDatabase();

// Update table whenever there are changes in values in Students/orders/
const updateRef = ref(db, 'Orders');
onValue(updateRef, (snapshot) => {
    const data = snapshot.val();
    const table = document.querySelector("#table");
    table.innerHTML = "";
    for (const key in data) {
        const order = data[key];
        for (const dish in order) {
            table.innerHTML += `| ${dish} : ${order[dish]} |`;
        }
        table.innerHTML += "<br>";
    }
    //setTable(data);
})

function setTable (data) {
    let table = document.querySelector('#table');
    table.innerHTML = `
   <tr>
    <th>Name</th>
    <th>Phone</th>
    <th>Tron</th>
    <th>Cuon</th>
    <th>Trung Nuong</th>
    <th>Total</th>
  </tr>`;
    for (const proptery in data) {
        let tr = document.createElement("tr");
        let name = document.createElement("th");
        let phone = document.createElement("th");
        let tron = document.createElement("th");
        let cuon = document.createElement("th");
        let trungNuong = document.createElement("th");
        let total = document.createElement("th");

        name.innerHTML = data[proptery]["userName"];
        phone.innerHTML = data[proptery]["userPhoneNum"];
        tron.innerHTML = data[proptery]["btTron"];
        cuon.innerHTML = data[proptery]["btCuon"];
        trungNuong.innerHTML = data[proptery]["trungNuong"];
        total.innerHTML = data[proptery]["total"];

        tr.appendChild(name);
        tr.appendChild(phone);
        tr.appendChild(tron);
        tr.appendChild(cuon);
        tr.appendChild(trungNuong);
        tr.appendChild(total);
        table.appendChild(tr);
    }
}