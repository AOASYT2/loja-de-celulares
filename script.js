      // Product data with real phone images
        const products = [
            {
                id: 1,
                name: "iPhone 15 Pro Max",
                price: 2000,
                image: "imagens/logo.png"
            },
            {
                id: 2,
                name: "Samsung Galaxy S24 Ultra",
                price: 8499,
                image: "imagens/image.png"
            },
            {
                id: 3,
                name: "Google Pixel 8 Pro",
                price: 6999,
                image: "/imagens/2image.png"
            },
            {
                id: 4,
                name: "OnePlus 12",
                price: 5499,
                image: "/imagens/3image.png"
            },
            {
                id: 5,
                name: "Xiaomi 14 Ultra",
                price: 6299,
                image: "/imagens/4image.png"
            },
            {
                id: 6,
                name: "Asus ROG Phone 8",
                price: 7499,
                image: "/imagens/5image.png"
            },
            {
                id: 7,
                name: "Motorola Edge 50 Pro",
                price: 4299,
                image: "/imagens/6image.png"
            },
            {
                id: 8,
                name: "Sony Xperia 1 V",
                price: 8999,
                image: "/imagens/7image.png"
            },
            {
                id: 9,
                name: "Nothing Phone (2)",
                price: 4999,
                image: "/imagens/8image.png"
            },
            {
                id: 10,
                name: "OPPO Find X6 Pro",
                price: 6999,
                image: "/imagens/9image.png"
            },
            {
                id: 11,
                name: "Vivo X100 Pro",
                price: 5799,
                image: "/imagens/10image.png"
            },
            {
                id: 12,
                name: "Realme GT 5 Pro",
                price: 3999,
                image: "/imagens/11image.png"
            }
        ];
        // Cart state
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        // Users database
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            checkUserSession();
            renderProducts();
            updateCartUI();
        });
        // Check user session
        function checkUserSession() {
            // Sempre mostrar a seção de produtos inicialmente
            showProductsSection();
            
            // Apenas atualizar a UI do usuário se estiver logado
            if (currentUser) {
                updateUserUI();
            }
        }
        // Show login section
        function showLoginSection() {
            document.getElementById('loginSection').style.display = 'flex';
        }
        // Close login section
        function closeLoginSection() {
            document.getElementById('loginSection').style.display = 'none';
        }
        // Show products section
        function showProductsSection() {
            document.getElementById('productsSection').style.display = 'block';
        }
        // Update user UI
        function updateUserUI() {
            if (currentUser) {
                document.getElementById('userInfo').classList.remove('hidden');
                document.getElementById('userName').textContent = currentUser.name;
                document.getElementById('loginBtn').classList.add('hidden');
                document.getElementById('logoutBtn').classList.remove('hidden');
            } else {
                document.getElementById('userInfo').classList.add('hidden');
                document.getElementById('loginBtn').classList.remove('hidden');
                document.getElementById('logoutBtn').classList.add('hidden');
            }
        }
        // Logout
        function logout() {
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateUserUI();
            showToast('Você saiu da sua conta');
        }
        // Render products
        function renderProducts() {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-price">R$ ${product.price.toLocaleString('pt-BR')}</div>
                        <div class="product-actions">
                            <button class="btn-product btn-primary" onclick="buyNow(${product.id})">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                                Comprar
                            </button>
                            <button class="btn-product btn-secondary" onclick="addToCart(${product.id})">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 5v14M5 12h14"></path>
                                </svg>
                                Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        // Login functions
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
        }
        function showRegisterForm() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.remove('hidden');
            clearMessages();
        }
        function showLoginForm() {
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
            clearMessages();
        }
        function clearMessages() {
            document.getElementById('loginMessage').style.display = 'none';
            document.getElementById('registerMessage').style.display = 'none';
        }
        function showMessage(elementId, message, type) {
            const messageEl = document.getElementById(elementId);
            messageEl.textContent = message;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';
        }
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        function isValidPassword(password) {
            return password.length >= 6;
        }
        // Process login
        document.getElementById('loginFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!isValidEmail(email)) {
                showMessage('loginMessage', 'Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            if (!isValidPassword(password)) {
                showMessage('loginMessage', 'A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showMessage('loginMessage', `Bem-vindo(a), ${user.name}!`, 'success');
                updateUserUI();
                
                setTimeout(() => {
                    closeLoginSection(); // Apenas fecha o modal de login
                }, 1000);
            } else {
                showMessage('loginMessage', 'E-mail ou senha incorretos.', 'error');
            }
        });
        // Process register
        document.getElementById('registerFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (name.length < 2) {
                showMessage('registerMessage', 'Por favor, insira seu nome completo.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('registerMessage', 'Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            if (!isValidPassword(password)) {
                showMessage('registerMessage', 'A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('registerMessage', 'As senhas não coincidem.', 'error');
                return;
            }
            
            if (users.some(u => u.email === email)) {
                showMessage('registerMessage', 'Este e-mail já está cadastrado.', 'error');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            showMessage('registerMessage', 'Conta criada com sucesso!', 'success');
            
            setTimeout(() => {
                document.getElementById('registerFormElement').reset();
                showLoginForm();
            }, 2000);
        });
        // Cart functions
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCart();
            updateCartUI();
            showToast(`${product.name} adicionado ao carrinho!`);
        }
        function buyNow(productId) {
            const product = products.find(p => p.id === productId);
            showToast(`Redirecionando para compra de ${product.name}...`);
        }


        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('overlay');
            
            cartSidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        }


        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart"><p>Seu carrinho está vazio</p></div>';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>R$ ${item.price.toLocaleString('pt-BR')}</p>
                            <div class="cart-item-actions">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="color: #ff4444; border-color: #ff4444;">✕</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        }
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                    updateCartUI();
                }
            }
        }
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartUI();
        }
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
       function checkout() {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!');
        return;
    }
    
    // Simula o processamento da compra
    showToast('Processando sua compra...');
    
    // Após um breve delay, simula a conclusão da compra
    setTimeout(() => {
        // Zera o carrinho
        cart = [];
        saveCart();
        updateCartUI();
        
        // Fecha o carrinho
        toggleCart();
        
        // Exibe mensagem de sucesso
        showToast('Compra realizada com sucesso! Obrigado pela preferência.');
    }, 1500);
}



     function showToast(message) {
    const toast = document.getElementById('toast');
    
    // Remove a classe 'show' se já estiver visível
    toast.classList.remove('show');
    
    // Força um reflow para reiniciar a animação
    void toast.offsetWidth;
    
    // Define a nova mensagem e exibe
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
   
