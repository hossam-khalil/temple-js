let fatora=[];
let table = document.querySelector("table tbody");
let totalSpan = document.querySelector("#total");
let billBalanc = document.querySelector(".bill");

checkStorage();
renderDataIntoTable();
let billindex=0 ;

function homePage(){
  let text = JSON.stringify(fatora);
  localStorage.setItem("fatora",text);
  window.location.href="./index.html";
}


function renderBill(){
  billBalanc.style.display="flex";
}


function hidBill(){
  billBalanc.style.display="none";
}

function checkStorage(){
    let datStorage = localStorage.getItem("fatora");
    if(datStorage){
        let arr = JSON.parse(datStorage);
        fatora = arr ;
    }
    else{
        alert("ther is no data into cart");
    }
}

function renderDataIntoTable(){
    let totalFatora=0 ;
    table.innerHTML =" ";
    fatora.forEach((el,index)=>{
        let rowTotal=el.price * el.qty ;
        totalFatora += rowTotal;
        table.innerHTML +=`
        <tr>
              <td>${index + 1}</td>
              <td><img src="${el.imgSrc}" width="50" /></td>
              <td>${el.name}</td>
              <td>${el.price} EGP</td>
              <td>
                  <button class="btn btn-danger" onclick="decrementQty(${index})">-</button>
                  ${el.qty}
                  <button class="btn btn-primary" onclick="incrementQty(${index})">+</button>
              </td>
              <td>${el.price * el.qty}</td>
              <td><button class="btn btn-danger" onclick="delProductFromFator(${index})">del</button></td>
        </tr>
        `;
    });
    totalSpan.innerHTML = totalFatora;
}
function delProductFromFator(productIndex) {
    fatora.splice(productIndex, 1);
    renderDataIntoTable();
  }


function incrementQty(productIndex) {
    fatora[productIndex].qty++
    renderDataIntoTable();
  }
  
  function decrementQty(productIndex) {
  
    if (fatora[productIndex].qty > 1) {
      fatora[productIndex].qty--;
      renderDataIntoTable();
    
    } else {
      delProductFromFator();
    }
  }