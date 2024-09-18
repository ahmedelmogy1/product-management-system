
//? variable
var inputName=document.getElementById("name")
var inputCategoray=document.getElementById("categoray")
var inputPrice=document.getElementById("price")
var inputDiscount=document.getElementById("discount")
var inputDescription=document.getElementById("description")
var inputStatus=document.getElementById("status")
var inputFile=document.getElementById("file")
var SiteProuct=document.getElementById("cards")
var regexNameCategoray=/^([a-zA-Z0-9\u0600-\u06FF]+[\s_-]?){1,5}$/
var regexPrice=/^(?:[1-9][0-9][0-9]{0,4}|500000)$/
var regexDescription=/^(\b\w+\b\s?){1,10}$/
var btnControl=document.getElementById("btnControl")
var buttons=document.getElementById("buttons")
var currentIndex




var products=[]

if(localStorage.getItem("products")!==null){
   products=JSON.parse(localStorage.getItem("products"))
    for(var i=0;i<products.length;i++){
        displayProduct(i)
    }
}





//^ function 
function addProduct()
{
if(
    validation(inputName,regexNameCategoray)&&
    validation(inputCategoray,regexNameCategoray)&&
    validation(inputPrice,regexPrice)&&
    validation(inputDescription,regexDescription)&&
    inputFile.files.length>0
)
{
    var  product=
{
    name:inputName.value,
    categoray:inputCategoray.value,
    price:inputPrice.value,
    discount:inputDiscount.value,
    priceAfterDiscount:inputPrice.value-inputDiscount.value,
    description:inputDescription.value,
    status:inputStatus.value,
    imgPath:"./imgs/" + inputFile.files[0].name   
    
}
if(btnControl.innerHTML==="update"){
    products.splice(currentIndex,1,product)
    SiteProuct.innerHTML="";
    for(var i=0;i<products.length;i++){
        displayProduct(i)
    }
    btnControl.innerHTML="Add product"
    btnControl.classList.add("btn-primary")


    
    }
else{
    products.push(product)
    displayProduct(products.length-1)
}

localStorage.setItem("products",JSON.stringify(products))  

clear()


}

}
function clear(){
    inputName.value=""
inputCategoray.value=""
inputPrice.value=""
inputDiscount.value=""
inputDescription.value=""
inputFile.value=null
validation(inputName,regexNameCategoray)
validation(inputCategoray,regexNameCategoray)
validation(inputPrice,regexPrice)
validation(inputDiscount,regexPrice)
validation(inputDescription,regexDescription)
}
function selectIcon(index){
    if(products[index].status==="Free shipping"){
        return `<i class="fa-solid fa-truck-fast text-warning"></i>`
    }
    else{
        return `<i class="fa-solid fa-percent text-warning"></i>`
    }
}
// function calcPrice(index){
//     if(products[index].price>products[index].discount){
//          return products[index].price-products[index].discount
//     }
//     else{
//         inputDiscount.classList.add("is-invalid") 
//         inputDiscount.style.border="2px solid red"
//         return false
//     }

// }
function displayProduct(index){
   
   if(products[index].discount===""){
    SiteProuct.innerHTML+=
`
    <div class="inner px-1 col-sm-6 col-md-4 col-lg-2 py-1 position-relative">
            <div class="layer1 position-absolute d-flex justify-content-center align-items-center gap-2 flex-column">
           <button class="btn btn-danger w-50 button" onclick="deleteProduct(${index})" type="button">delete</button>
           <button class="btn btn-warning w-50" onclick="update(${index})">update</button>
           </div>
    
         <div class="card p-3 ">
           <div class="w-100">
             <img class="w-100 img" src="${products[index].imgPath}" />
           </div>
           <div class="">
             <p>${products[index].name}<br>${products[index].description}</p>
             <h4 class="d-inline-block ">${products[index].priceAfterDiscount}</h4>
             <span class="d-inline-block">E.G</span>
             
             <span class="d-block"
               >${selectIcon(index)}
               <span>${products[index].status}</span></span>
           </div>
         </div>
       </div>
   `
   }
   else {
    SiteProuct.innerHTML+=
    `
    <div class="inner px-1 col-sm-6 col-md-4 col-lg-2 py-1 position-relative">
          <div class="layer1 position-absolute d-flex justify-content-center align-items-center gap-2 flex-column">
           <button class="btn btn-danger w-50 button" onclick="deleteProduct(${index})" type="button">delete</button>
           <button class="btn btn-warning w-50" onclick="update(${index})">update</button>
           </div>
    
         <div class="card p-3 ">
           <div class="w-100">
             <img class="w-100 img" src="${products[index].imgPath}" />
           </div>
           <div class="">
             <p>${products[index].name}<br>${products[index].description}</p>
             <h4 class="d-inline-block ">${products[index].priceAfterDiscount}</h4>
             <span class="d-inline-block">E.G</span>
             <del class="">${products[index].price} E.G</del>
             <span class="d-block"
               >${selectIcon(index)}
               <span>${products[index].status}</span></span>
           </div>
         </div>
       </div>
   `
   }

}
function validation(elment,regex) 
{
if(regex.test(elment.value)===true){
    elment.classList.add("is-valid") 
    elment.classList.remove("is-invalid") 
     elment.style.border="2px solid limegreen"
}
else{
    elment.classList.remove("is-valid") 
    elment.classList.add("is-invalid") 
    elment.style.border="2px solid red"
   
    if(elment.value===""){
        elment.classList.remove("is-valid") 
        elment.classList.remove("is-invalid")
        elment.style.boxShadow="0 0 0 0 "
        elment.style.border=" 1px solid rgba(0, 0, 0, 0.137)"
        return false
    }
    return false
    //  if(calcPrice()===true){
    //     elment.classList.add("is-valid") 
    //     elment.classList.remove("is-invalid") 
    //      elment.style.border="2px solid limegreen"
    //  }
    //  else{
    //     elment.classList.remove("is-valid") 
    //     elment.classList.add("is-invalid") 
    //     elment.style.border="2px solid red"
    //  }

// }
// if(inputDiscount.value>inputPrice.value){
//     elment.classList.remove("is-valid") 
//     elment.classList.add("is-invalid") 
//     elment.style.border="2px solid red"
//     return false
// }
// return true;



// 
}
return true;
}
function deleteProduct(index){
    products.splice(index,1)
    localStorage.setItem("products",JSON.stringify(products))  
    SiteProuct.innerHTML=""
    for(var i=0;i<products.length;i++){
        displayProduct(i)
    }
}
function update(index){
    inputName.value=products[index].name
    inputCategoray.value=products[index].categoray
    inputPrice.value=products[index].price
    inputDiscount.value=products[index].discount
    inputDescription.value=products[index].description
    // inputFile.file[0]=products[index].img
     btnControl.innerHTML="update"
     btnControl.classList.add("btn-warning")
     currentIndex=index



    // btnControl.classList.remove("btn-primary")
    // btnControl.classList.add("btn-warning")
}
//  function updated(index){
//     products[index].name=inputName.value
//     products[index].categoray= inputCategoray.value
//     products[index].price=inputPrice.value
//     products[index].discount=inputDiscount.value
//     products[index].description=inputDescription.value


  
//  }
