let bagItemsObject;
let Conveniencefee = 99;
onLoad();
function onLoad() {
  loadBagItemsObject();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSUmmaryElement = document.querySelector('.bag-summary');
  if (bagItemsObject.length == 0) {
    Conveniencefee = 0;
    bagSUmmaryElement.innerHTML = `
    <h1>No Item in Cart</h1>
    `;
    return;
  }
  let totalItems = bagItemsObject.length;
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalPayment = 0;

  bagItemsObject.forEach(
    bagItem => {
      totalMrp += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
      totalPayment += bagItem.current_price;
    }
  );
  totalPayment += Conveniencefee;
  bagSUmmaryElement.innerHTML = `
  <div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">Rs${totalMrp}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs${Conveniencefee}</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs ${totalPayment}</span>
          </div>
        </div>
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>`;
}

function loadBagItemsObject() {
  console.log(bagItems);

  bagItemsObject = bagItems.map(itemsId => {
    for (let i = 0; i < items.length; i++) {
      if (itemsId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemsObject);
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHtml = ``;
  bagItemsObject.forEach(bagItem => {
    innerHtml += generateHtml(bagItem);
  });
  containerElement.innerHTML = innerHtml;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(item => item !== itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemsObject();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}

function generateHtml(item) {
  return `
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart " onclick = "removeFromBag(${item.id})">X</div>
          </div>
          `;
}