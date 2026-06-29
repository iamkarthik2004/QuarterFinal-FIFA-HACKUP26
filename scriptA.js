document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Fan Comments
    const commentsList = document.querySelector('.comments-list');
    const initialComments = [
        { name: 'Diogo21', text: 'Vamos Argentina! 🇦🇷🔥', time: '2m ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Beatriz_Fan', text: 'Messi is the GOAT! 🐐❤️', time: '3m ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'JoaoSilva', text: 'Este é o nosso ano! 🏆', time: '4m ago', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' },
        { name: 'Marta07', text: 'Força Argentina! 💪🇦🇷', time: '5m ago', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'TheRedArmy', text: 'Argentina até morrer! 🔥', time: '6m ago', avatar: 'https://randomuser.me/api/portraits/men/90.jpg' }
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
        { name: 'Leo_Fan', text: 'Que golaço! ⚽', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Ana_Silva', text: 'Dibu Martinez! 🧤', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { name: 'Mateo94', text: 'Vamos Muchachos! 🇦🇷', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' }
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
