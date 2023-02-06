const allHandbags = document.querySelector(".all-handbags");
const handbagForm = document.querySelector(".add-handbag");
const handbagList = document.querySelector("#handbag-list");

allHandbags.addEventListener('click', () => {
  document.querySelector('.handbag-form').style.display = 'none';
  document.querySelector('.handbags-section').style.display = 'block';
});

handbagForm.addEventListener('click', () => {
  document.querySelector('.handbag-form').style.display = 'block';
  document.querySelector('.handbags-section').style.display = 'none';
});

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const handbagPhoto = form.querySelector(".handbag-photo").files[0];
  const handbagName = form.querySelector(".handbag-name").value;
  const price = form.querySelector(".price").value;
  
  const li = document.createElement("li");
  li.innerHTML = `
    <div> <img class="img-responsive" src="${URL.createObjectURL(handbagPhoto)}"/> </div>
    <div class="text-center"> <span>${handbagName}</span> </div>
    <div class="text-center"> <span>${price}</span> </div>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;
  
  li.querySelector(".delete").addEventListener("click", (event) => {
    li.remove();
    let handbags = JSON.parse(localStorage.getItem("handbags")) || [];
    const handbagIndex = handbags.findIndex((handbag) => handbag.handbagName === handbagName);
    handbags.splice(handbagIndex, 1);
    localStorage.setItem("handbags", JSON.stringify(handbags));
  });

  li.classList.add("item");
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

  // Clear the values in the form fields
  form.reset();
});
// Retrieve the stored data and recreate the list items on page reload
window.addEventListener("load", () => {
  const handbags = JSON.parse(localStorage.getItem("handbags")) || [];
  handbags.forEach((handbag) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div> <img class="img-responsive" src="${handbag.dataURL}"/> </div>
      <div class="text-center"> <span>${handbag.handbagName}</span> </div>
      <div class="text-center"> <span>${handbag.price}</span>  </div>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    li.querySelector(".delete").addEventListener("click", (event) => {
      li.remove();
      let handbags = JSON.parse(localStorage.getItem("handbags")) || [];
      const handbagIndex = handbags.findIndex((handbag) => handbag.handbagName === handbag.handbagName);
      handbags.splice(handbagIndex, 1);
      localStorage.setItem("handbags", JSON.stringify(handbags));
    });
    
    li.classList.add("item");
    handbagList.appendChild(li);
  });
});
