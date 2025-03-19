let bagItems;
onLoad();
function onLoad() {
    let bagItemsString = localStorage.getItem('bagItems');
    bagItems = bagItemsString ? JSON.parse(bagItemsString) : [];
    displayBagIcon();
    diaplayItemsOnHomePage();
}
function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}
function displayBagIcon(){
    let bagIconElement = document.querySelector('.bag-items-count');
    if (bagItems.length > 0) {
        bagIconElement.style.visibility = 'visible';
        bagIconElement.innerText = bagItems.length;
    } else {
        bagIconElement.style.visibility = 'hidden';
    }
}

function diaplayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector('.items-container');
    let innerHtml = ``;
    if(!itemsContainerElement) return;
    items.forEach(item => {
        innerHtml += `
            <div class="item-container">
                <img class="item-image" src="${item.image}" alt="">
                <div class="rating">
                    ${item.rating.stars}⭐ | ${(item.rating.count)}
                </div>
                <div class="company-name">
                    ${item.company}
                </div>
                <div class="item-name">
                    ${item.item_name}
                </div>
                <div class="price">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% off)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">
                    Add to Bag
                </button>
            </div>
`;
    });
    itemsContainerElement.innerHTML = innerHtml;
}