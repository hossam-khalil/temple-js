
data["pizzas"];
let CatDiv=document.querySelector("#cats");
let catProductsDiv=document.querySelector("#cards");
let body=document.querySelector("body");
let navbar= document.querySelector("#navbar");
let dataArry = turnObjectToArray(data);
let fator = document.querySelector(".fator");
let span= document.querySelector("#cartNo");


let carindex=0;
 let openCat="pizzas";

let fatora=[];

//  start function
renderProdect();
checkStorage();
openProducts(openCat);

  function showSideCart(){
    carindex=1;
    let sideCart=document.querySelector("#sideCart");
    if(!sideCart){
      body.innerHTML +=`
        <div id="sideCart" class="animate__animated animate__fadeInRight" onclick="event.stopPropagation()">
      </div>
      `;
    };
    renderFatora();
    renderProdect();

  }

  function openNavber(){
      navbar.style.display="flex";
  }

  
   function hidesidecat(){
    let sideCart=document.querySelector("#sideCart");
    sideCart.remove();
  }

function renderProdect(){
  CatDiv.innerHTML=" ";
  for (const cat in data) {
   CatDiv.innerHTML+=`
   <a href="#" onclick="openProducts('${cat}')" class="${
    cat==openCat ? "catactiv" : "catdef" }  "> ${cat}</a>  
    `}
}

function openProducts(cat, array = 0) {
  let products = [];
  if (!cat) {
    products = array;
  } else {
    openCat = cat;
    renderProdect();
    products = data[cat];
  }
  catProductsDiv.innerHTML =" ";
  products.forEach((el, index) => {
    catProductsDiv.innerHTML +=`
    <div class="card col-sm-12 col-md-6 col-lg-3" onclick="event.stopPropagation()">
    <img
        src="${el.imgSrc}"
        class="card-img-top"
        alt="..."
    />
    <div class="card-body">
    <h5 class="card-title">${el.name}</h5>
    <p class="card-text">price : ${el.price} EGP</p>
    <button class="btn btn-primary" onclick="addProductToFatora('${cat}',${index})">Add to Cart</button>
    </div>
</div>
`;
  });
}
function rendercardprodect(cat){
  let sideCart=document.querySelector("#sideCart");
  let pro=data[cat];
  sideCart.innerHTML=""; 
 pro.forEach((el,index)=>{
  sideCart.innerHTML+=`
  <div class="card">
  <img src="${el.imgSrc}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${el.size}g</h5>
    <p class="card-text">${el.price}EGP</p>
    <a href="#" class="btn btn-waring" onclick="addProductToFatora('${cat}',${index})">Add card </a>  </div>
</div>
  `
 });
 let count = fatora.length;
 let span= document.querySelector("#cartNo");
 span.innerHTML = count;

}
 function addProductToFatora(cat,productindex ){
  let product= data[cat][productindex];
let index=fatora.findIndex((pro)=>{
  return pro.name == product.name ;
});
if(index==-1){
  product.qty = 1;
  fatora.push(product);
}
else{
  fatora[index].qty ++;
}
showSideCart();
renderFatora();
let text= JSON.stringify(fatora);
sessionStorage.setItem("fatora",text);
 }

function checkStorage(){
  let dataStorage= sessionStorage.getItem("fatora");
  if(dataStorage){
    let arr = JSON.parse(dataStorage);
    fatora= arr ;
    let span= document.querySelector("#cartNo");
    span.innerHTML = arr.length;

  }
}


 function renderFatora(){
  let sideCart=document.querySelector("#sideCart");
  sideCart.innerHTML = " ";
  fatora.forEach((el, index) => {
    sideCart.innerHTML += `<div class="col-12 p-3 mb-3 productInCart">
        <img src="${el.imgSrc}" height="50"/>
        <div class="d-flex p-2 flex-column flex-wrap" style="flex-grow:1">
            <p>Name : ${el.name}</p>
            <p>Price : ${el.price} EGP</p>
        </div>
        <div class="d-flex justify-items-center flex-column">
            <button class="btn btn-danger" onclick="decrementQty(${index})">-</button>
            <p class="text-center mb-0">${el.qty}</p>
            <button class="btn btn-success" onclick="incrementQty(${index})">+</button>
        </div>
        <i class="fa-solid fa-circle-xmark  btn-danger" onclick="delProductFromFator(${index})" ></i>
    </div>`;
  });
  let count = fatora.length;
  let span= document.querySelector("#cartNo");
  span.innerHTML = count;
 }

 function delProductFromFator(productIndex) {
  fatora.splice(productIndex, 1);
  let count = fatora.length;
 let span= document.querySelector("#cartNo");
 span.innerHTML = count;
  renderFatora();
}

function incrementQty(productIndex) {
  fatora[productIndex].qty++;
  let count = fatora.length;
 let span= document.querySelector("#cartNo");
 span.innerHTML = count;
  renderFatora();
}

function decrementQty(productIndex) {

  if (fatora[productIndex].qty > 1) {
    fatora[productIndex].qty--;
    renderFatora();
    let count = fatora.length;
 let span= document.querySelector("#cartNo");
 span.innerHTML = count;
  } else {
    delProductFromFator();
  }
}


 function openCartPage(){
  let text = JSON.stringify(fatora);
  localStorage.setItem("fatora",text);
  window.location.href="./cart.html";

 }


 function filterData(event) {
  let final = dataArry.filter((el) => {
    return (
      el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1
    );
  });
  if (final.length == dataArry.length) {
    openProducts(openCat);
  } else {
    openProducts(undefined, final);
  }
  // return final;
}
function turnObjectToArray(object) {
  let arr = [];
  for (const key in object) {
    object[key].forEach((el) => {
      arr.push(el);
    });
  }
  return arr;
}

function allowNo(event) {
  console.log(event.keyCode);
  let allowed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  if (allowed.indexOf(+event.key) == -1 || event.keyCode == 32) {
    event.preventDefault();
  }
}
