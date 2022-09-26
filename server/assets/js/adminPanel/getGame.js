const searchButton = document.getElementById("search");
const itemContainer = document.getElementById("itemContainer");
const titleInput = document.getElementById("title");

//update form inputs

titleInput.addEventListener("keypress",(ev)=>{
    if (ev.key === "Enter"){
        searchButton.click();
    }
})
searchButton.addEventListener("click",(ev)=>{
    spinnerStatus(false);
    getAllgames(titleInput.value);
})

async function getAllgames(title = ""){
    const request = await fetch(`/api/games/${title}`);
    if (request.status === 502){
        spinnerStatus(true);
        itemContainer.innerHTML = "Bad Gateway";
        return;
    }else if (request.status === 204){
        spinnerStatus(true);
        itemContainer.innerHTML = "No Content";
        return;
    }
    const jsonData = await request.json();
    spinnerStatus(true);
    itemContainer.innerHTML = "";
    jsonData.forEach(data => {
        let div = document.createElement("div");
        div.classList.add("gameItem");
        div.classList.add("m-2");
        renderGame(div,data);
        itemContainer.appendChild(div);
    });
}
function renderGame(div,data){
    div.dataset.objectId = data["_id"];
    div.dataset.title = data.title;
    div.dataset.type = data.type;
    div.dataset.stock = data.stock;
    div.dataset.price = data.price;
    div.innerHTML = `
    <div class="gameImage" style="background-image:url('../images/${data.imageName}');"></div>
    <div class="title">
        <b> ${data.title} </b>
    </div>
    <div class="info" >
        <h3 class="price"><b> ${data.price}DT </b></h3>
        <h5 style="color: ${data.stock>0 ? "rgb(0,255,0)":"rgb(255,0,0)"};"><b> ${data.stock>0 ? "In stock":"Out of stock"} </b></h5>
    </div>
    <div class = "gameBottom">
        <div class = "d-flex flex-row">
            <button type="button" class="btn btn-danger" onclick="deleteGame(this)">Delete</button>
            <button type="button" class="btn btn-warning" onclick="fillUpdateForm(this)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Update</button>
        </div>
    </div>
    `;
}
function spinnerStatus(hide = true){
    const button = document.getElementById("spinner");
    if (hide){
        button.style.display = "none";
    }else{
        button.style.display = "block";
    }
}