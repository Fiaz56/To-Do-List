const addBtn = document.getElementById("add");
const listTitle = document.getElementById("listItem");
const description = document.getElementById("textArea");

function getAndUpdate() {
    console.log("Adding...")
    if (localStorage.getItem("itemsJson") == null) {
        let itemJsonArray = [];
        itemJsonArray.push([listTitle.value, description.value]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray))
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([listTitle.value, description.value]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem("itemsJson") == null) {
        let itemJsonArray = [];
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray))
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    //Populating the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleted(${index})">Delete</button></td>
        </tr>`;
    });
    tableBody.innerHTML = str;
}

addBtn.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
    console.log("Delete", itemIndex)
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //Delete ItemIndex element
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
}

function clearStorage() {
    if (confirm("Do you really want to clear the list?")) {
        console.log("Clearing the list...");
        localStorage.clear();
        update();
    }
}