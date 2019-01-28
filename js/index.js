// показать карточку ну ту что корзина

(() => {
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', () => {
        cart.classList.toggle('show-cart');
    });
    
})();

// добавить элемент в карточку

(() => {
    const cartBtn = document.querySelectorAll('.store-item-icon');
    let fonBlock = document.createElement('div');
    fonBlock.classList.add('fon', 'd-none');
    document.body.appendChild(fonBlock);

    cartBtn.forEach((btn) => {
        btn.addEventListener('click', ({ target }) => {
            if (target.parentElement.classList.contains('store-item-icon')) {
                let fullPath = target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf(`img`) + 3; //... такие дела
                let partPath = fullPath.slice(pos);

                const item = {};
                item.img = `img.cart${partPath}`;

                let name = target.parentElement.parentElement.nextElementSibling
                .children[0].children[0].textContent;
                
                let price = target.parentElement.parentElement.nextElementSibling
                .children[0].children[1].textContent; 

                let finalPrice = price.slice(1).trim();

                item.name = name; 
                item.price = finalPrice;
             
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
                cartItem.id = "cart-item";
                cartItem.innerHTML = `  <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="cart-item-text">
    
                  <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                  <span>$</span>
                  <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                  <i class="fas fa-trash"></i>
                </a>
              </div>`;

                // добавление карточки
                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');
                cart.insertBefore(cartItem, total);

                // удаление карточки
                let deleteBtn = cartItem.childNodes[5];

                deleteBtn.addEventListener('click', () => {
                 cart.removeChild(cartItem);
                 showTotals();
                }); 

                // удаление всех карточек
                let clearCart = document.getElementById('clear-cart');

                clearCart.addEventListener('click', () => {

                    let cartItems = document.querySelectorAll('.cart-item');
                    cartItems.forEach((item) => {
                            cart.removeChild(item);
                            showTotals();
                        });
                        
                });
                
                showTotals();
            }
        });

    });
   
        
    let btnCheck = document.querySelector('.btn-pink');
    let form = document.createElement('div');
    form.classList.add('form', 'row');
    form.id = 'form';
    form.innerHTML = `
    <div class="close-bl float-right">
        <a class="close" href="#"><i class="fas fa-times"></i></a>
    </div>
    <div class="col-12 input d-flex text-center">
        <p class="info">Name</p>
        <input class="form-input"/>
    </div>
    <div class="col-12 input d-flex text-center">
        <p class="info">Email</p>
        <input class="form-input"/>
    </div>
    <div class="col-12 input d-flex text-center">
        <p class="info">Phone number</p>
        <input class="form-input"/>
    </div>
    <div class="col-12 submit d-flex">
        <p id="form-price">Total: </p>
        <a href="#" id="submit" class="btn float-right">Buy cackes</a>
    </div>`;
    let closeForm = form.childNodes[0].children[0].children[0];

     btnCheck.addEventListener('click', () => {
        showTotals();
        fonBlock.appendChild(form);
        fonBlock.classList.toggle('d-none');
        document.body.style.overflow = 'hidden'; // ..................

        let formPrice = document.getElementById('cart-total').textContent;

        form.childNodes[8].children[0].textContent = `Total: $${formPrice}`;

        let submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', () => { // доделать проверку на цену и сделать валидацию инпатов
            let inputs = document.querySelectorAll('.form-input');
            let check = true;
            inputs.forEach((item) => {
                if (item.value == '' || item.value == null || item.value == undefined) {
                    check = false;
                    item.classList.add('error-input');
                    item.addEventListener('click', () => {
                        item.classList.remove('error-input');
                    });
                } 
            });

            if(check) {
                inputs.forEach((item) => {
                    item.value = '';
                    item.classList.remove('error-input');
                });
                alert(`We did not check the correctness of the input
                 as we are sure that you are smart enough to enter your data`);
                alert(`we still checked, but somehow it doesn’t 
                matter that you entered we don’t send anything to you anyway, ALL BAD `);
                fonBlock.classList.add('d-none');
                document.body.style.overflow = 'auto';
            }
            
        });
    });
    closeForm.addEventListener('click', () => {
        clearForm = document.querySelectorAll('.form-input');
        clearForm.forEach((item) => {
            item.value = '';
        });
        fonBlock.classList.add('d-none');
        document.body.style.overflow = 'auto'; // ..............
    });
    
  
    //полная цена всего что добавлено

    const showTotals = () => {
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');
        items.forEach((item) => {
            total.push(parseFloat(item.textContent));
        });

        const totalMoney = total.reduce((total, item) => {
            total += item;
            return total;
        }, 0);
        const finalPrice = totalMoney.toFixed(2);
        document.getElementById('cart-total').textContent = finalPrice;
        document.querySelector('.item-total').textContent = finalPrice;
        document.getElementById('item-count').textContent = total.length;

    }; 



})();

// фильтр

(() => {
    let filterItems = document.querySelectorAll('.filter-btn');
  
    for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].addEventListener('click', ({ target }) => {
        let storeItems = document.querySelectorAll('.store-item');
        storeItems.forEach((item) => {
            if (item.getAttribute('data-item') !== target.getAttribute('data-filter')) {
                item.classList.add('d-opacite');
            } else {
                item.classList.remove('d-opacite');
            }
            if (target.getAttribute('data-filter') == 'all') {
                item.classList.remove('d-opacite');
            }
        });
    })
    }
  
    let searchItem = document.getElementById('search-item');
    searchItem.addEventListener('input', ({ target }) => {
        let cards = document.querySelectorAll('.card');
        cards.forEach((item) => {
            let name = item.querySelector('.store-item-name');
            name = name.textContent.toLowerCase();
            if (name.indexOf(target.value.toLowerCase()) !== -1) {
                item.classList.remove('d-opacite');
            } else {
                item.classList.add('d-opacite');
            }
        });
    });
 
})();



// кнопки 
// 2 страницы (еще нет)
// футер бы еще доделать (сделать)