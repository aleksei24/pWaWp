import { dataBase } from './dataBase';

const itemMain = document.querySelectorAll('.item-main');

function displayContext() {
  try {
    const grabData = fetch(dataBase);
    const responceData = JSON.stringify(grabData);
    const itemFill = responceData;
    console.log(itemFill);
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  displayContext();
});
