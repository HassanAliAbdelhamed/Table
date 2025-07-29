let quest = document.getElementById("quest");
let desk = document.getElementById("desk");
let srcImg = document.getElementById("srcImg");
let postBtn = document.getElementById("postBtn");

postBtn.onclick = function(event) {
    event.preventDefault();
    addToStorage(quest.value, desk.value, srcImg);
}

function addToStorage(questValue, deskValue, srcImg) {
    let products = localStorage.getItem("products");
    let productsArray = products ? JSON.parse(products) : [];

    
    let newProduct = {
    id: 1,
    title: questValue,
    author: "By: Wade Warren ",
    image: srcImg.value,
    excerpt: deskValue,
    likes: 35,
    };
    
    productsArray.push(newProduct);

    localStorage.setItem("products", JSON.stringify(productsArray));
}
