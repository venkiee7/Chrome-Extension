let myLeads = []
let oldLeads = []
// myLeads = JSON.parse(myLeads) // Converts string to array
// myLeads.push("www.epiclead.com")

// // let myLeads = ["www.awesomelead.com"]
// myLeads = JSON.stringify(myLeads) // Converts array to string
// console.log(typeof myLeads);

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    // console.log(tabs[0].url);
    // Grab the URL of the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);         
    })
})

deleteBtn.addEventListener("dblclick", function(){
    console.log("double clicked!");
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    // Clear out the input field
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target = '_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems  
}
