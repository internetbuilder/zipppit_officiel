// content.js

// Создатель: https://vk.com/abuz.trade 
// Группа создателя: https://vk.com/lowbank.trade 
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var wait_time = 250 // milliseconds

console.log("AutoApprove started!")

window.onload = async function() {
    console.log("Page loaded!")
    // click to box
    var box = document.querySelector('input[data-indeterminate="false"]')
    if (box != null) {
        document.querySelector('input[data-indeterminate="false"]').click();
        console.log("click on box!");
    }
    while (document.querySelector('button[class="button button-secondary button-large text-1-5rem text-bold mx-1"]') == null) {await sleep(wait_time); console.log("Wait button...")}
    // set interval to click approve
    clck_approve = setInterval(() => { document.querySelector('button[class="button button-secondary button-large text-1-5rem text-bold mx-1"]').click(); console.log("Try to click on Approve"); }, wait_time)
}
