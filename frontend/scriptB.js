document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Fan Comments
    const commentsList = document.querySelector('.comments-list');
    const initialComments = [
        { name: 'Diogo21', text: 'Vamos Brasil! 🇧🇷🙌', time: '2m ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Beatriz_Fan', text: 'Neymar is the GOAT! 🐐💛💚', time: '3m ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'JoaoSilva', text: 'Este é o nosso ano! 🏆', time: '4m ago', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' },
        { name: 'Marta07', text: 'Força Brasil! 💪🇧🇷', time: '5m ago', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'TheRedArmy', text: 'Brasil até morrer! 🔥', time: '6m ago', avatar: 'https://randomuser.me/api/portraits/men/90.jpg' }
    ];

    function createCommentElement(comment) {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `
            <div class="comment-avatar">
                <img src="${comment.avatar}" alt="${comment.name}">
            </div>
            <div class="comment-content">
                <div class="comment-top">
                    <span class="comment-author">${comment.name}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `;
        return div;
    }

    // Populate initial comments
    initialComments.forEach(comment => {
        commentsList.appendChild(createCommentElement(comment));
    });

    // Simulate incoming live comments
    const liveMessages = [
        { name: 'Ronaldo_Fan', text: 'Incrível jogada! ⚽', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Ana_Silva', text: 'Rumo ao hexa! 🙌', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { name: 'Taffarel94', text: 'Sai que é tua! 🛡️', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' }
    ];

    let messageIndex = 0;
    setInterval(() => {
        if (messageIndex < liveMessages.length) {
            const newComment = {
                ...liveMessages[messageIndex],
                time: 'Just now'
            };
            const commentEl = createCommentElement(newComment);
            commentEl.style.opacity = '0';
            commentEl.style.transform = 'translateY(-10px)';
            commentsList.prepend(commentEl);
            
            // Animate in
            setTimeout(() => {
                commentEl.style.transition = 'all 0.3s ease';
                commentEl.style.opacity = '1';
                commentEl.style.transform = 'translateY(0)';
            }, 50);

            messageIndex++;
        }
    }, 8000); // Add a new comment every 8 seconds

    // 2. Score Predictor
    const predictBtn = document.getElementById('predict-btn');
    const homeScore = document.getElementById('home-score');
    const awayScore = document.getElementById('away-score');
    const currentPrediction = document.getElementById('current-prediction');

    if (predictBtn) {
        predictBtn.addEventListener('click', () => {
            const hVal = homeScore.value;
            const aVal = awayScore.value;
            
            predictBtn.innerHTML = 'PREDICTING... <i class="fa-solid fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                currentPrediction.textContent = `${hVal} - ${aVal}`;
                predictBtn.innerHTML = 'PREDICT SCORE <i class="fa-solid fa-wand-magic-sparkles"></i>';
                
                // Highlight prediction result briefly
                currentPrediction.style.color = 'var(--green-accent)';
                setTimeout(() => {
                    currentPrediction.style.color = 'white';
                }, 1000);
            }, 800);
        });
    }

    // 3. Country Toggles (Visual only)
    const countryBtns = document.querySelectorAll('.country-btn');
    countryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            countryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 3.5 Legend Cards Click Handler
    const legendCards = document.querySelectorAll('.legend-card');
    legendCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // 4. Authentication logic
    let currentUser = null;
    let isSignupMode = false;

    const userBtn = document.getElementById('user-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const welcomeMsg = document.getElementById('welcome-msg');
    const logoutBtn = document.getElementById('logout-btn');
    
    const authModal = document.getElementById('auth-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const authForm = document.getElementById('auth-form');
    const modalTitle = document.getElementById('modal-title');
    const switchAuthModeBtn = document.getElementById('switch-auth-mode');
    const switchText = document.getElementById('switch-text');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (userBtn && authModal) {
        // Check login status on load
        fetch('/api/me')
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    currentUser = data.username;
                }
            })
            .catch(err => console.error(err));

        userBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent closing immediately
            if (currentUser) {
                welcomeMsg.textContent = `Welcome, ${currentUser}!`;
                userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
            } else {
                authModal.style.display = 'flex';
            }
        });

        document.addEventListener('click', (e) => {
            if (userDropdown.style.display === 'block' && !userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });

        closeModalBtn.addEventListener('click', () => {
            authModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });

        switchAuthModeBtn.addEventListener('click', () => {
            isSignupMode = !isSignupMode;
            modalTitle.textContent = isSignupMode ? 'Sign Up' : 'Login';
            switchText.textContent = isSignupMode ? 'Already have an account?' : "Don't have an account?";
            switchAuthModeBtn.textContent = isSignupMode ? 'Login' : 'Sign up';
        });

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;
            const endpoint = isSignupMode ? '/api/signup' : '/api/login';

            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    currentUser = data.username;
                    authModal.style.display = 'none';
                    usernameInput.value = '';
                    passwordInput.value = '';
                }
            })
            .catch(err => console.error(err));
        });

        logoutBtn.addEventListener('click', () => {
            fetch('/api/logout', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    currentUser = null;
                    userDropdown.style.display = 'none';
                })
                .catch(err => console.error(err));
        });
    }

    // 5. Live Chat Input
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    if (chatInput && sendBtn) {
        sendBtn.addEventListener('click', () => {
            if (!currentUser) {
                if(authModal) authModal.style.display = 'flex';
                else alert("Please login first.");
                return;
            }
            if (chatInput.value.trim() !== '') {
                const newComment = {
                    name: currentUser,
                    text: chatInput.value.trim(),
                    time: 'Just now',
                    avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser) + '&background=random'
                };
                
                const commentEl = createCommentElement(newComment);
                commentEl.style.opacity = '0';
                commentEl.style.transform = 'translateY(-10px)';
                commentsList.prepend(commentEl);
                
                setTimeout(() => {
                    commentEl.style.transition = 'all 0.3s ease';
                    commentEl.style.opacity = '1';
                    commentEl.style.transform = 'translateY(0)';
                }, 50);
                
                chatInput.value = '';
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }

    // 6. Favorite (Heart) Toggle Handler
    const favoriteBtns = document.querySelectorAll('.favorite');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('liked');
            const icon = btn.querySelector('i');
            if (icon) {
                if (btn.classList.contains('liked')) {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                } else {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                }
            }
        });
    });
});

// Toast Notification Function
window.showToast = function(message) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custom-toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

window.cartItems = [];

window.addToCart = function(button) {
    const card = button.closest('.jersey-card');
    const name = card.querySelector('.jersey-info h5').textContent;
    const priceText = card.querySelector('.price').textContent;
    const size = card.querySelector('select').value;
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    
    window.cartItems.push({name: name + ' (Size: ' + size + ')', price: price});
    renderCart();
    
    showToast('Item added to cart!');
    document.getElementById('cart-section').scrollIntoView({behavior: 'smooth'});
};

window.renderCart = function() {
    const cartSummary = document.querySelector('.cart-summary');
    if (window.cartItems.length === 0) {
        cartSummary.innerHTML = '<h3>Cart Summary</h3><p>Your cart is currently empty.</p>';
        return;
    }
    
    let html = '<h3>Cart Summary</h3><ul style="list-style: none; padding: 0; margin-bottom: 15px;">';
    let total = 0;
    
    window.cartItems.forEach((item, index) => {
        html += '<li style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 8px;">' +
                    '<span style="color: #ffffff; font-weight: 500;">' + item.name + '</span>' +
                    '<span style="color: #f2ce0c; font-weight: 700;">₹ ' + item.price.toLocaleString('en-IN') + '</span>' +
                 '</li>';
        total += item.price;
    });
    
    html += '</ul>';
    html += '<div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem; color: #ffffff; margin-top: 15px; border-top: 2px solid rgba(242, 206, 12, 0.3); padding-top: 12px;">' +
                '<span>Total:</span>' +
                '<span style="color: #f2ce0c; font-weight: 800;">₹ ' + total.toLocaleString('en-IN') + '</span>' +
             '</div>';
             
    cartSummary.innerHTML = html;
    
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.textContent = window.cartItems.length;
    });
};

// Initialize badges on load
document.addEventListener('DOMContentLoaded', () => {
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.textContent = '0';
    });
});
