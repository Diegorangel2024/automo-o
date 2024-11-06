// Contadores de itens
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

// Função genérica para adicionar um item ao carrinho com verificação de duplicatas e limitação de toppings
function addToCart(itemType, itemNumber, button) {
    let itemDetails = '';

    if (itemType === 'Poke') {
        const base = button.parentElement.querySelector('.poke-base').value;
        const selectedToppings = Array.from(button.parentElement.querySelectorAll('.poke-toppings input:checked')).map(input => input.value);

        // Limita a seleção de toppings a 5
        if (selectedToppings.length > 5) {
            alert("Você pode selecionar no máximo 5 toppings.");
            // Desmarcando o topping extra
            let checkedToppings = button.parentElement.querySelectorAll('.poke-toppings input:checked');
            let excessToppings = checkedToppings.length - 5;

            // Desmarcar os toppings extras
            for (let i = 0; i < excessToppings; i++) {
                checkedToppings[i].checked = false;
            }

            return;  // Não adiciona ao carrinho se exceder o limite
        }

        itemDetails = `Poke ${itemNumber}: Base: ${base}, Toppings: ${selectedToppings.join(', ')}`;
    } else if (itemType === 'Temaki') {
        const temakiType = button.parentElement.querySelector(`input[name="temaki${itemNumber}"]:checked`).value;
        itemDetails = `Temaki ${itemNumber}: Tipo: ${temakiType}`;
    } else if (itemType === 'Ceviche') {
        const cevicheSelected = button.parentElement.querySelector(`#ceviche${itemNumber}`).checked ? 'Ceviche' : '';
        itemDetails = `Ceviche ${itemNumber}: ${cevicheSelected}`;
    }

    const itemIndex = cartItems.findIndex(item => item.name === itemDetails);

    // Verifica se o item já existe no carrinho
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = 1; // Mantém a quantidade em 1
    } else {
        cartItems.push({ name: itemDetails, quantity: 1 });
    }

    updateCartDisplay();
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

// Função para remover um item
function removeItem(button) {
    const itemDiv = button.parentElement;
    const itemName = itemDiv.querySelector('h4').textContent;
    
    // Remove o item correspondente do carrinho
    cartItems = cartItems.filter(item => !item.name.startsWith(itemName));
    
    // Remove o item visualmente
    itemDiv.remove();
    updateCartDisplay();
}

// Função para atualizar o display do carrinho
function updateCartDisplay() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeItemFromCart(item.name);

        li.appendChild(removeButton);
        cart.appendChild(li);
    });
}

// Função para remover item do carrinho
function removeItemFromCart(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    updateCartDisplay();
}

// Função para enviar o pedido via WhatsApp
function sendOrder() {
    const phoneNumber = '5521996481418';
    const message = encodeURIComponent(`Pedido:\n${cartItems.map(item => item.name).join('\n')}\nCliente: ${document.getElementById('name').value}\nDirección: ${document.getElementById('address').value}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Função para limpar o carrinho
function clearCart() {
    cartItems = [];
    updateCartDisplay();
}
