# 🎯 Whack-A-Mole Quiz Game

An interactive educational game that teaches players about different types of AI (Artificial Intelligence) through a fun whack-a-mole gameplay mechanic.

## 🎮 Game Overview

Test your knowledge of AI types by whacking the correct mole! Each question presents a scenario, and you must identify which type of AI handles it:
- 🔵 **Search Engine** - Finding existing information
- 🟢 **Traditional AI** - Pattern recognition and predictions
- 🟣 **Generative AI** - Creating new content
- 🔴 **Agentic AI** - Taking real-world actions

## ✨ Features

- **12 Educational Questions** about AI concepts
- **Dynamic Scoring System** with points based on cycles
- **5-Minute Timer** with MM:SS format display
- **Sound Effects** for correct answers, wrong answers, and whacking
- **Background Music** for immersive gameplay
- **Congratulations Popup** for correct answers
- **Detailed Feedback** for wrong answers (5-second display)
- **Fully Responsive Design** - Works on desktop and mobile devices
- **Visual Feedback** with color-coded moles matching AI categories

## 🎨 Game Elements

- **4 Holes** representing different AI types (color-coded)
- **1 Mole** that moves between holes
- **Hammer** cursor that follows and strikes
- **Decorative Elements** - grass, stones, mud, flowers, and fences
- **Score Tracking** with streak counter
- **Best Streak** tracking across gameplay

## 🎯 Scoring System

- **First Cycle (First 4 moves):** +10 points per correct answer
- **Second Cycle (Next 4 moves):** +7 points per correct answer
- **Third Cycle (Next 4 moves):** +5 points per correct answer
- **Fourth Cycle (Next 4 moves):** +3 points per correct answer
- **Fifth Cycle (Next 4 moves):** +2 points per correct answer
- **Sixth+ Cycle:** +1 point per correct answer
- After 6 cycles, the question is marked as unanswered and moves to the next

## 🚀 How to Play

1. Click the **Start** button to begin
2. Read the question displayed at the top
3. Watch the mole pop up in different colored holes
4. Click on the mole when it appears in the hole matching the correct AI type
5. Get immediate feedback with points for correct answers
6. Learn from explanations when you make a mistake
7. Complete all 12 questions before time runs out!

## 🛠️ Technologies Used

- **HTML5** - Structure and layout
- **CSS3** - Styling and animations
  - Responsive design with clamp() and media queries
  - Custom animations for mole movements and hammer strikes
  - Gradient backgrounds and visual effects
- **JavaScript (ES6)** - Game logic and interactivity
  - Dynamic question management
  - Score calculation and tracking
  - Timer functionality
  - Audio control
- **Audio** - Sound effects and background music

## 📱 Mobile Responsive

The game is fully optimized for mobile devices with:
- Touch-friendly controls
- Adaptive sizing for all screen sizes
- Optimized layout for portrait and landscape modes
- Compact UI elements for smaller screens

## 🎵 Audio Files

- `Background_sound.mp3` - Background music (loops continuously)
- `correct_sound.mp3` - Plays on correct answers
- `wrong_sound.mp3` - Plays on wrong answers
- `whack_sound.mp3` - Plays when whacking anywhere

## 📂 Project Structure

```
Whack-A-Mole-Game/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Game logic
├── Sound/              # Audio files
│   ├── Background_sound.mp3
│   ├── correct_sound.mp3
│   ├── wrong_sound.mp3
│   └── whack_sound.mp3
├── mole.png           # Mole character image
├── hammer.png         # Hammer cursor image
├── hole.png           # Hole/mud image
├── fence.png          # Fence decoration
├── stone.png          # Stone decoration
├── flower.png         # Flower decoration
└── README.md          # This file
```

## 🎓 Educational Value

This game teaches players to distinguish between:

1. **Search Engines** - Retrieving existing information from the web
2. **Traditional AI** - Using machine learning to recognize patterns and make predictions
3. **Generative AI** - Creating new content (text, images, music)
4. **Agentic AI** - Taking autonomous actions in the real world

## 🌐 Live Demo

Play the game at: https://sayam2122.github.io/Whack-A-Mole-Game/

## 💻 Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Sayam2122/Whack-A-Mole-Game.git
   ```

2. Navigate to the project folder:
   ```bash
   cd Whack-A-Mole-Game
   ```

3. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000 in your browser
   ```

## 🎮 Game Controls

- **Mouse Click** - Whack the mole / Click buttons
- **Touch Tap** (Mobile) - Whack the mole / Tap buttons

## 🔧 Customization

You can easily customize:
- Questions in `script.js` - Edit the `predefinedQuestions` array
- Timer duration - Change `gameState.timer` value (in seconds)
- Scoring points - Modify the `getPointsForCurrentCycle()` function
- Speed - Adjust `gameState.hammerSpeed` (in milliseconds)
- Colors and styling in `style.css`

## 📝 Game Rules

1. Each question must be answered within 6 cycles (24 mole appearances)
2. Points decrease with each cycle, rewarding faster responses
3. Wrong answers show a 5-second explanation
4. The game ends when time runs out or all questions are completed
5. Try to achieve the highest score and best streak!

## 🏆 Tips for High Scores

- Answer quickly in the first few cycles for maximum points
- Read questions carefully to avoid wrong answers
- Learn from feedback explanations
- Watch the mole's position carefully
- Practice makes perfect!

## 👨‍💻 Developer

Created by Sayam

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Inspired by the classic Whack-A-Mole arcade game
- Designed to make learning about AI fun and interactive
- Built with love for education and gaming

---

**Enjoy the game and learn about AI! 🎯🤖**
