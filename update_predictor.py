import glob
import re

rankings = [
    'Argentina', 'Spain', 'France', 'England', 'Portugal', 'Brazil', 'Morocco',
    'Netherlands', 'Belgium', 'Germany', 'Croatia', 'Italy', 'Colombia',
    'Mexico', 'Senegal', 'Uruguay', 'United States', 'Japan', 'Switzerland', 'Iran', 'India'
]

for html_file in glob.glob('frontend/index*.html'):
    with open(html_file, 'r') as f:
        content = f.read()

    # 1. Replace Opponent block
    opponent_block_regex = r'<div class="team">\s*<div class="trophy-icon"><i class="fa-solid fa-trophy"></i></div>\s*<span>OPPONENT</span>\s*</div>'
    
    options = ''.join([f'<option value="{team}">{team}</option>' for team in rankings])
    select_html = f'''<div class="team" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                        <select id="opponent-select" style="padding: 8px; border-radius: 4px; border: 1px solid #444; background: #222; color: #fff; font-weight: bold; width: 120px; font-size: 0.9rem;">
                            <option value="" disabled selected>Opponent</option>
                            {options}
                        </select>
                    </div>'''
    
    content = re.sub(opponent_block_regex, select_html, content)
    
    # 2. Add id="home-team-name" to the home team span
    content = re.sub(r'<span>(ARGENTINA|BRAZIL|PORTUGAL|INDIA)</span>', r'<span id="home-team-name">\1</span>', content)
    
    # 3. Remove the winner-selection buttons
    winner_selection_regex = r'<div class="winner-selection".*?</div>'
    content = re.sub(winner_selection_regex, '', content, flags=re.DOTALL)
    
    with open(html_file, 'w') as f:
        f.write(content)
    print(f'Updated HTML: {html_file}')

js_replacement = '''    // 2. Automated Winner Predictor
    const predictBtn = document.getElementById('predict-btn');
    const currentPrediction = document.getElementById('current-prediction');
    const opponentSelect = document.getElementById('opponent-select');
    const homeTeamSpan = document.getElementById('home-team-name');
    
    const rankings = {
        'Argentina': 1, 'Spain': 2, 'France': 3, 'England': 4, 'Portugal': 5,
        'Brazil': 6, 'Morocco': 7, 'Netherlands': 8, 'Belgium': 9, 'Germany': 10,
        'Croatia': 11, 'Italy': 12, 'Colombia': 13, 'Mexico': 14, 'Senegal': 15,
        'Uruguay': 16, 'United States': 17, 'Japan': 18, 'Switzerland': 19, 'Iran': 20,
        'India': 99 // Default for India since not in top 20
    };

    if (predictBtn && opponentSelect && homeTeamSpan) {
        predictBtn.addEventListener('click', () => {
            const opponent = opponentSelect.value;
            const homeTeamUpper = homeTeamSpan.textContent.trim();
            
            // Map homeTeamUpper (e.g., BRAZIL) to camel case key (Brazil)
            let homeTeam = homeTeamUpper.charAt(0).toUpperCase() + homeTeamUpper.slice(1).toLowerCase();
            
            if (!opponent) {
                if (typeof showToast === 'function') {
                    showToast('Please select an opponent first!');
                } else {
                    alert('Please select an opponent first!');
                }
                return;
            }
            
            let homeRank = rankings[homeTeam] || 100;
            let awayRank = rankings[opponent] || 100;
            
            let predictedWinner = 'DRAW';
            if (homeRank < awayRank) {
                predictedWinner = homeTeamUpper + ' WIN';
            } else if (awayRank < homeRank) {
                predictedWinner = opponent.toUpperCase() + ' WIN';
            }
            
            predictBtn.innerHTML = 'PREDICTING... <i class="fa-solid fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                currentPrediction.textContent = predictedWinner;
                predictBtn.innerHTML = 'PREDICT WINNER <i class="fa-solid fa-wand-magic-sparkles"></i>';
                
                currentPrediction.style.color = 'var(--green-accent)';
                setTimeout(() => {
                    currentPrediction.style.color = 'white';
                }, 1000);
            }, 800);
        });
    }'''

for js_file in glob.glob('frontend/script*.js'):
    with open(js_file, 'r') as f:
        content = f.read()
        
    content = re.sub(r'// 2\. Who Will Win Predictor.*?// 3\.', js_replacement + '\n\n    // 3.', content, flags=re.DOTALL)
    
    with open(js_file, 'w') as f:
        f.write(content)
    print(f'Updated JS: {js_file}')
