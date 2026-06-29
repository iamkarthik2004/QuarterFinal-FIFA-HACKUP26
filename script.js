document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Fan Comments
    const commentsList = document.querySelector('.comments-list');
    const initialComments = [
        { name: 'Diogo21', text: 'Vamos Portugal! 🇵🇹🔥', time: '2m ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Beatriz_Fan', text: 'Cristiano is the GOAT! 🐐❤️', time: '3m ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'JoaoSilva', text: 'Este é o nosso ano! 🏆', time: '4m ago', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' },
        { name: 'Marta07', text: 'Força Portugal! 💪🇵🇹', time: '5m ago', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'TheRedArmy', text: 'Portugal até morrer! 🔥', time: '6m ago', avatar: 'https://randomuser.me/api/portraits/men/90.jpg' }
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
        { name: 'Rui_Costa', text: 'Incrível! ⚽', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Ana_Silva', text: 'Acreditar até ao fim! 🙌', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { name: 'PepeFan', text: 'Defesa de ferro! 🛡️', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' }
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

    // 3. Country Toggles (Visual only)
    const countryBtns = document.querySelectorAll('.country-btn');
    countryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            countryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
