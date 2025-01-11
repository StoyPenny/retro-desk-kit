# Retro Desk Kit

A nostalgic productivity suite featuring a calculator, sticky notes, world clocks, todo list, and Pomodoro timer - all designed with a retro aesthetic.

## Overview

Retro Desk Kit is a web-based productivity dashboard that combines essential desk tools in a vintage-inspired interface. The application includes:

- Calculator with basic arithmetic operations
- Sticky notes system with local storage persistence
- World clock display with multiple timezone support
- Todo list with checkbox functionality
- Pomodoro timer with customizable work/break intervals
- Timezone converter utility

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- JavaScript enabled
- Local storage access enabled in browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/retro-desk-kit.git
```

2. Navigate to the project directory:
```bash
cd retro-desk-kit
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure
```
retro-desk-kit/
├── index.html         # Main HTML structure
├── style.css          # CSS styling and layouts
├── script.js          # Core JavaScript functionality
├── constants.js       # Gloabl constants
├── package.json       # Project dependencies and scripts
└── src/
    └── main.js        # Module-based JavaScript code
    └── Calulator.js   # Module-based JavaScript code
    └── Notes.js       # Module-based JavaScript code
└── services/
    └── AppState.js         # Module-based JavaScript code
    └── StorageService.js   # Module-based JavaScript code
└── utils/
    └── errorHandling.js    # Errpor handling
    └── eventHandling.js    # Event handling
    └── timezones.js        # Timezone utility
    └── validation.js       # Validation utility
```

### Component Overview
- **Calculator**: Basic arithmetic calculator with essential operations
- **Notes**: Sticky notes system with a maximum of 5 notes
- **World Clocks**: Real-time clock display for multiple timezones
- **Todo List**: Simple task management with completion tracking
- **Pomodoro Timer**: Focus timer with work/break intervals and session counting
- **Timezone Converter**: Utility for converting times between different zones

### Local Storage
The application uses browser local storage to persist:

- Sticky notes content
- Todo list items
- User preferences


### Contributing
Feel free to submit issues and enhancement requests.

### License
...coming soon...