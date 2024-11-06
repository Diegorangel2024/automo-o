let pokeCount = 0;
let temakiCount = 0;
let cevicheCount = 0;
let cartItems = [];

// Função para adicionar Poke ao carrinho
function addPoke() {
    pokeCount++;
    const pokeContainer = document.getElementById('poke-container');
    const pokeDiv = document.createElement('div');
    pokeDiv.classList.add('poke-item');
    
    pokeDiv.innerHTML = `
        <h4>Poke ${pokeCount}</h4>
        <label>Base:</label>
        <select class="poke-base">
            <option value="arroz">Arroz</option>
            <option value="mix-hojas">Mix de folhas</option>
        </select>
        
        <label>Toppings (Selecione até 5):</label>
        <div class="poke-toppings">
            <label><input type="checkbox" value="cream-cheese"> Cream cheese</label>
            <label><input type="checkbox" value="alga-nori"> Alga nori</label>
            <label><input type="checkbox" value="cebolla-morada"> Cebola morada</label>
            <label><input type="checkbox" value="skin"> Skin</label>
            <label><input type="checkbox" value="pepino"> Pepino</label>
            <label><input type="checkbox" value="zanahoria"> Zanahoria</label>
            <label><input type="checkbox" value="repollo"> Repollo</label>
            <label><input type="checkbox" value="tomate"> Tomate</label>
            <label><input type="checkbox" value="papas"> Papas</label>
        </div>
        <button type="button" onclick="addToCart('Poke', ${pokeCount}, this)">Agregar al carrito</button>
        <button type="button" onclick="removeItem(this)">Quitar Poke</button>
    `;
    pokeContainer.appendChild(pokeDiv);
}

// Função para adicionar Temaki ao carrinho
function addTemaki() {
    temakiCount++;
    const temakiContainer = document.getElementById('temaki-container');
    const temakiDiv = document.createElement('div');
    temakiDiv.classList.add('temaki-item');
    
    temakiDiv.innerHTML = `
        <h4>Temaki ${temakiCount}</h4>
        <label><input type="radio" name="temaki${temakiCount}" value="salmón"> Salmón Classic</label>
        <label><input type="radio" name="temaki${temakiCount}" value="hot"> Hot Philadelphia</label>
        <button type="button" onclick="addToCart('Temaki', ${temakiCount}, this)">Agregar al carrito</button>
        <button type="button" onclick="removeItem(this)">Quitar Temaki</button>
    `;
    temakiContainer.appendChild(temakiDiv);
}

// Função para adicionar Ceviche ao carrinho
function addCeviche() {
    cevicheCount++;
    const cevicheContainer = document.getElementById('ceviche-container');
    const cevicheDiv = document.createElement('div');
    cevicheDiv.classList.add('ceviche-item');
    
    cevicheDiv.innerHTML = `
        <h4>Ceviche ${cevicheCount}</h4>
        <label><input type="checkbox" id="ceviche${cevicheCount}"> Ceviche</label>
        <button type="button" onclick="addToCart('Ceviche', ${cevicheCount}, this)">Agregar al carrito</button>
        <button type="button" onclick="removeItem(this)">Quitar Ceviche</button>
    `;
    cevicheContainer.appendChild(cevicheDiv);
}

// Função para adicionar um item ao carrinho
function addToCart(itemType, itemNumber, button) {
    let itemDetails = '';

    if (itemType === 'Poke') {
        const base = button.parentElement.querySelector('.poke-base').value;
        const selectedToppings = Array.from(button.parentElement.querySelectorAll('.poke-toppings input:checked')).map(input => input.value).join(', ');
        itemDetails = `Poke ${itemNumber}: Base: ${base}, Toppings: ${selectedToppings}`;
    } else if (itemType === 'Temaki') {
        const temakiType = button.parentElement.querySelector(`input[name="temaki${itemNumber}"]:checked`).value;
        itemDetails = `Temaki ${itemNumber}: Tipo: ${temakiType}`;
    } else if (itemType === 'Ceviche') {
        const cevicheSelected = button.parentElement.querySelector(`#ceviche${itemNumber}`).checked ? 'Ceviche' : '';
        itemDetails = `Ceviche ${itemNumber}: ${cevicheSelected}`;
    }

    cartItems.push(itemDetails);
    updateCart();
}

// Função para remover um item
function removeItem(button) {
    // Remove o item da lista
    const itemDiv = button.parentElement;
    itemDiv.remove();
}

// Função para limpar o carrinho
function clearCart() {
    cartItems = [];
    updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cart.appendChild(li);
    });
}

// Função para enviar o pedido via WhatsApp
function sendOrder() {
    const phoneNumber = '5521996481418'; // Número atualizado
    const message = encodeURIComponent(`Pedido:\n${cartItems.join('\n')}\nPara el cliente: ${document.getElementById('name').value}\nDirección: ${document.getElementById('address').value}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
}