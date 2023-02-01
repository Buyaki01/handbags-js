const form = document.querySelector("form");
const handbagList = document.querySelector("#handbag-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const handbagPhoto = form.querySelector(".handbag-photo").files[0];
  const handbagName = form.querySelector(".handbag-name").value;
  const price = form.querySelector(".price").value;
  
  const li = document.createElement("li");
  li.innerHTML = `
    <div> <img class="img-responsive" src="${URL.createObjectURL(handbagPhoto)}"/> </div>
    <div> 
      <span>${handbagName}</span>
      <span>${price}</span>
    </div>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;
  
  li.querySelector(".delete").addEventListener("click", (event) => {
    li.remove();
  });
  
  handbagList.appendChild(li);


  const reader = new FileReader();
  reader.onload = function() {
    const dataURL = reader.result;
    // Store the handbag data in the local storage
    let handbags = JSON.parse(localStorage.getItem("handbags")) || [];
    handbags.push({dataURL, handbagName, price});
    localStorage.setItem("handbags", JSON.stringify(handbags));
  };
  reader.readAsDataURL(handbagPhoto);
});
// Retrieve the stored data and recreate the list items on page reload
window.addEventListener("load", () => {
  const handbags = JSON.parse(localStorage.getItem("handbags")) || [];
  handbags.forEach((handbag) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div> <img class="img-responsive" src="${handbag.dataURL}"/> </div>
      <div> <span>${handbag.handbagName}</span> </div>
      <div> <span>${handbag.price}</span>  </div>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    li.querySelector(".delete").addEventListener("click", (event) => {
      li.remove();
    });

    handbagList.appendChild(li);
  });
});

