    /* Carrito */

        function shoppingCart() {

            // Boton "Agregar al carrito" y Productos
                const addToShoppingCart = document.querySelectorAll( '.add-to-cart-btn' ); // Botón "Agregar al carrito"
                

                addToShoppingCart.forEach( ( addToCartButtons ) => {
                    addToCartButtons.addEventListener( 'click', addToCartBtnClick )
                });

                function addToCartBtnClick( event ) {
                    let btn = event.target;
                    const prods = btn.closest( '.prod' );

                    // Productos
                        const prodImg = prods.querySelector( '.prod-img' ).src;                        
                        const prodTitle = prods.querySelector( '.prod-title' ).textContent;
                        const prodPrice = prods.querySelector( '.prod-price' ).textContent;

                    modalCart( prodImg, prodTitle, prodPrice );
                    cartCounterUpdate();
                };
                
            // Modal cart
                const showCart = document.querySelector( '.show-cart' );
                    
                function modalCart( prodImg, prodTitle, prodPrice ) {

                    // Que no se duplique el mismo producto en el Carrito
                        let prodsTitleRepeat = showCart.getElementsByClassName( 'shoppingCartprodTitle' );
                            
                        for( let i = 0; i < prodsTitleRepeat.length; i++ ) {
                            if( prodsTitleRepeat[i].innerHTML === prodTitle ) {
                                let prodsTitleQuantity = prodsTitleRepeat[i].parentElement.parentElement.querySelector( '.shoppingCartprodQuantity' );
                                prodsTitleQuantity.value++;
                                cartTotalPrice();
                            
                                return;
                            }
                        };

                    const shoppingCartDiv = document.createElement( 'div' );
                    const cartModal =
                        ` 
                            <div class="row shoppingCartprod mt-3 text-center">
                                <div class="col-3">
                                    <img src=${prodImg} class="imagenesModal"/>
                                    <h6 class="mt-2 shoppingCartprodTitle">${prodTitle}</h6>
                                </div> 
                                <div class="col-3">
                                    <p class="prod-price shoppingCartprodPrice">${prodPrice}</p>
                                </div>
                                <div class="col-3">
                                    <input class="text-center shoppingCartprodQuantity inputCuenta" type="number" value="1">
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-danger" id="remove-prod-btn" data-name="${prodTitle}">
                                        x
                                    </button>
                                </div>
                            </div>
                        `
                                            
                    shoppingCartDiv.innerHTML = cartModal;
                    showCart.append( shoppingCartDiv );

                    // Botón Remove prod
                        const removeButton = shoppingCartDiv.querySelector( '#remove-prod-btn' );

                        removeButton.addEventListener( 'click', removeprodFromCart );

                    // Input Quantity
                        const inputCartQuantity = shoppingCartDiv.querySelector( '.shoppingCartprodQuantity' );
                        
                        inputCartQuantity.addEventListener( 'change', cartQuantityChange );
                    
                        
                    cartTotalPrice();
                };

            // Cart Counter
                function cartCounterUpdate() {
                    const cartprodsLength = document.querySelectorAll( '.shoppingCartprod' );
                    const cartCounter = document.querySelector( '#cart-counter' );
                    cartCounter.innerHTML = cartprodsLength.length;
                    cartTotalPrice();
                };
            // Precio total del carrito
                function cartTotalPrice() {
                    var totalCount = 0;
                    const totalPrice = document.querySelector( '.total-price' );
                    const shoppingCartprods = document.querySelectorAll( '.shoppingCartprod' );
                    
                    shoppingCartprods.forEach( ( shoppingCartprod ) => {
                        const prodCartPriceElement = shoppingCartprod.querySelector( '.shoppingCartprodPrice' );
                        const prodCartPrice = Number( prodCartPriceElement.textContent.replace( '$', '' ) );
                        const prodCartQuantityElement = shoppingCartprod.querySelector( '.shoppingCartprodQuantity' );
                        const prodCartQuantity = Number( prodCartQuantityElement.value );
                        totalCount += prodCartPrice * prodCartQuantity;
                    });
                    totalPrice.innerHTML = `$${totalCount.toFixed(2)}`;
                };
            // Eliminar productos del carrito
                function removeprodFromCart(event) {
                    const removeBtnClicked = event.target;
                    removeBtnClicked.closest( '.shoppingCartprod' ).remove();
                    cartTotalPrice();
                    cartCounterUpdate();
                };
            // Cantidad del carrito (Input)
                function cartQuantityChange(event) {
                    const inputCartChange = event.target;
                    inputCartChange.value <= 0 ? ( inputCartChange.value = 1 ) : null;
                    cartTotalPrice();
                    cartCounterUpdate();
                };

            // Finalizar compra
                const botonFinalizarCompra = document.querySelector( '.btn-finalizar-compra' );
                botonFinalizarCompra.addEventListener('click', finalizarCompraTotal);

                function finalizarCompraTotal() {
                    showCart.innerHTML = '';
                    cartTotalPrice();
                    cartCounterUpdate();
                };

            // Vaciar todo el carrito
                const botonVaciarCarrito = document.querySelector( '.btn-vaciar-carrito' );
                botonVaciarCarrito.addEventListener('click', vaciarCarritoCompleto);

                function vaciarCarritoCompleto() {
                    showCart.innerHTML = '';
                    cartTotalPrice();
                    cartCounterUpdate();
                };
        };
        shoppingCart();