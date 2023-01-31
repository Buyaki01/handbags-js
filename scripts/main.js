const photoInput = document.querySelector('.handbag-photo');
const handbagNameInput = document.querySelector('.handbag-name');
const priceInput = document.querySelector('.price');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const photo = photoInput.files[0];
  const handbagName = handbagNameInput.value;
  const price = priceInput.value;
  console.log(`Handbag Photo: ${photo}`);
  console.log(`Handbag Name: ${handbagName}`);
  console.log(`Price: ${price}`);
});
