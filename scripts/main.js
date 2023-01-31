const photoInput = document.querySelector('.handbag-photo');
const handbagNameInput = document.querySelector('.handbag-name');
const priceInput = document.querySelector('.price');
const handbagForm = document.querySelector('form');
const handbagList = document.querySelector('#handbag-list');

handbagForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const photo = photoInput.files[0];
  const handbagName = handbagNameInput.value;
  const price = priceInput.value;

  const reader = new FileReader();
  reader.readAsDataURL(photo);
  reader.onload = function() {
    const photoDataURL = reader.result;
  
    const handbagItem = document.createElement('li');
    handbagItem.innerHTML = `
      <div>
        <div class="img-responsive">
          <img src=${photoDataURL} alt="#">
        </div>
        <div class="text-center">
          <h5>${handbagName}</h5>
          <h6>${price}</h6>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    `;
    handbagList.appendChild(handbagItem);
  };
});
