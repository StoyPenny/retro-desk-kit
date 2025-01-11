let display = document.getElementById('result');
    let notesContainer = document.getElementById('notes');
    let addNoteButton = document.getElementById('add-note-button');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const MAX_NOTES = 5;
    let todoList = document.getElementById('todo-list');
    let newTodoInput = document.getElementById('new-todo');
    let addTodoButton = document.getElementById('add-todo-button');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const MAX_TODOS = 5;
    let timerDisplay = document.getElementById('timer-display');
    let startButton = document.getElementById('start-timer');
    let pauseButton = document.getElementById('pause-timer');
    let resetButton = document.getElementById('reset-timer');
    let bellIcon = document.getElementById('bell-icon');
    let workDurationInput = document.getElementById('work-duration');
    let breakDurationInput = document.getElementById('break-duration');
    let timerMode = document.getElementById('timer-mode');
    let sessionTally = document.getElementById('session-tally');
    let timerInterval;
    let timeLeft = parseInt(localStorage.getItem('timeLeft')) || 25 * 60;
    let isTimerRunning = false;
    let isBreak = JSON.parse(localStorage.getItem('isBreak')) || false;
    let sessionCount = parseInt(localStorage.getItem('sessionCount')) || 0;
    let timezones = JSON.parse(localStorage.getItem('timezones')) || {
      timezone1: 'America/New_York',
      timezone2: 'Europe/London',
      timezone3: 'Asia/Tokyo'
    };
    let fromTimezoneSelect = document.getElementById('from-timezone');
    let toTimezoneSelect = document.getElementById('to-timezone');
    let convertedTimeDisplay = document.getElementById('converted-time');
    let converterTimezones = JSON.parse(localStorage.getItem('converterTimezones')) || {
      fromTimezone: '',
      toTimezone: 'America/New_York'
    };

    function appendValue(value) {
      if (display.value === '0' && value !== '.') {
        display.value = value;
      } else {
        display.value += value;
      }
    }

    function clearDisplay() {
      display.value = '0';
    }

    function backspace() {
      display.value = display.value.slice(0, -1);
      if (display.value === '') {
        display.value = '0';
      }
    }

    function calculate() {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
    }

    function createNoteElement(note) {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');

      const textarea = document.createElement('textarea');
      textarea.value = note.text;
      textarea.placeholder = 'Enter note text (max 280 chars)';
      textarea.maxLength = 280;
      textarea.addEventListener('input', () => {
        note.text = textarea.value;
        saveNotes();
      });

      const linkInput = document.createElement('input');
      linkInput.type = 'text';
      linkInput.value = note.link;
      linkInput.placeholder = 'Enter link';
      linkInput.addEventListener('input', () => {
        note.link = linkInput.value;
        saveNotes();
      });

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-note');
      removeButton.innerHTML = '&times;';
      removeButton.addEventListener('click', () => {
        removeNote(noteDiv, note.id);
      });

      noteDiv.appendChild(textarea);
      noteDiv.appendChild(linkInput);
      noteDiv.appendChild(removeButton);
      return noteDiv;
    }

    function addNote() {
      if (notes.length >= MAX_NOTES) {
        alert('You can only add up to 5 notes.');
        return;
      }

      const newNote = {
        id: Date.now(),
        text: '',
        link: ''
      };
      notes.push(newNote);
      const noteElement = createNoteElement(newNote);
      notesContainer.appendChild(noteElement);
      saveNotes();
    }

    function removeNote(noteDiv, noteId) {
      notesContainer.removeChild(noteDiv);
      notes = notes.filter(note => note.id !== noteId);
      saveNotes();
    }

    function saveNotes() {
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    addNoteButton.addEventListener('click', addNote);

    function updateClock(elementId, timezone) {
      const now = timezone ? new Date().toLocaleString('en-US', { timeZone: timezone }) : new Date();
      const date = timezone ? new Date(now) : now;
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      document.getElementById(elementId).textContent = `${hours}:${minutes}:${seconds}`;
    }

    function startClocks() {
      updateClock('local-clock');
      updateClock('clock-1', timezones.timezone1);
      updateClock('clock-2', timezones.timezone2);
      updateClock('clock-3', timezones.timezone3);
      setInterval(() => {
        updateClock('local-clock');
        updateClock('clock-1', timezones.timezone1);
        updateClock('clock-2', timezones.timezone2);
        updateClock('clock-3', timezones.timezone3);
      }, 1000);
    }

    document.getElementById('timezone-1').addEventListener('change', (e) => {
      timezones.timezone1 = e.target.value;
      localStorage.setItem('timezones', JSON.stringify(timezones));
      updateClock('clock-1', timezones.timezone1)
    });
    document.getElementById('timezone-2').addEventListener('change', (e) => {
      timezones.timezone2 = e.target.value;
      localStorage.setItem('timezones', JSON.stringify(timezones));
      updateClock('clock-2', timezones.timezone2)
    });
    document.getElementById('timezone-3').addEventListener('change', (e) => {
      timezones.timezone3 = e.target.value;
      localStorage.setItem('timezones', JSON.stringify(timezones));
      updateClock('clock-3', timezones.timezone3)
    });

    startClocks();

    function createTodoElement(todo) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        label.classList.toggle('completed', todo.completed);
        saveTodos();
      });

      const label = document.createElement('label');
      label.textContent = todo.text;
      if (todo.completed) {
        label.classList.add('completed');
      }

      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      return listItem;
    }

    function addTodo() {
      if (todos.length >= MAX_TODOS) {
        alert('You can only add up to 5 todo items.');
        return;
      }

      const newTodoText = newTodoInput.value.trim();
      if (newTodoText !== '') {
        const newTodo = {
          id: Date.now(),
          text: newTodoText,
          completed: false
        };
        todos.push(newTodo);
        const todoElement = createTodoElement(newTodo);
        todoList.appendChild(todoElement);
        newTodoInput.value = '';
        saveTodos();
      }
    }

    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodoButton.addEventListener('click', addTodo);

    function updateTimerDisplay() {
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const seconds = String(timeLeft % 60).padStart(2, '0');
      timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    function updateSessionTally() {
      let tally = '';
      for (let i = 0; i < sessionCount; i++) {
        tally += '|';
        if ((i + 1) % 5 === 0) {
          tally += ' ';
        }
      }
      sessionTally.textContent = tally;
    }

    function startTimer() {
      if (isTimerRunning) return;
      isTimerRunning = true;
      bellIcon.style.display = 'none';
      const workDuration = parseInt(workDurationInput.value, 10) || 25;
      const breakDuration = parseInt(breakDurationInput.value, 10) || 5;
      timeLeft = (isBreak ? breakDuration : workDuration) * 60;
      timerMode.textContent = isBreak ? 'Break' : 'Work';
      timerMode.classList.toggle('break', isBreak);
      updateTimerDisplay();

      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          bellIcon.style.display = 'block';
          if (!isBreak) {
            sessionCount++;
            updateSessionTally();
          }
          isBreak = !isBreak;
          localStorage.setItem('isBreak', JSON.stringify(isBreak));
          localStorage.setItem('sessionCount', sessionCount);
          startTimer();
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timerInterval);
      isTimerRunning = false;
      localStorage.setItem('timeLeft', timeLeft);
    }

    function resetTimer() {
      clearInterval(timerInterval);
      isTimerRunning = false;
      isBreak = false;
      timeLeft = (parseInt(workDurationInput.value, 10) || 25) * 60;
      timerMode.textContent = 'Work';
      timerMode.classList.remove('break');
      updateTimerDisplay();
      bellIcon.style.display = 'none';
      localStorage.setItem('isBreak', JSON.stringify(isBreak));
      localStorage.setItem('timeLeft', timeLeft);
    }

    notes.forEach(note => {
      const noteElement = createNoteElement(note);
      notesContainer.appendChild(noteElement);
    });

    todos.forEach(todo => {
      const todoElement = createTodoElement(todo);
      todoList.appendChild(todoElement);
    });

    workDurationInput.value = parseInt(localStorage.getItem('workDuration')) || 25;
    breakDurationInput.value = parseInt(localStorage.getItem('breakDuration')) || 5;

    workDurationInput.addEventListener('change', () => {
      localStorage.setItem('workDuration', workDurationInput.value);
    });

    breakDurationInput.addEventListener('change', () => {
      localStorage.setItem('breakDuration', breakDurationInput.value);
    });

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    updateTimerDisplay();
    updateSessionTally();
    timerMode.textContent = isBreak ? 'Break' : 'Work';
    timerMode.classList.toggle('break', isBreak);

    function updateConvertedTime() {
      const fromTimezone = fromTimezoneSelect.value;
      const toTimezone = toTimezoneSelect.value;
      let date;
      if (fromTimezone) {
        date = new Date().toLocaleString('en-US', { timeZone: fromTimezone });
        date = new Date(date);
      } else {
        date = new Date();
      }
      const convertedTime = date.toLocaleString('en-US', { timeZone: toTimezone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      convertedTimeDisplay.textContent = convertedTime;
    }

    fromTimezoneSelect.value = converterTimezones.fromTimezone;
    toTimezoneSelect.value = converterTimezones.toTimezone;
    updateConvertedTime();

    fromTimezoneSelect.addEventListener('change', (e) => {
      converterTimezones.fromTimezone = e.target.value;
      localStorage.setItem('converterTimezones', JSON.stringify(converterTimezones));
      updateConvertedTime();
    });

    toTimezoneSelect.addEventListener('change', (e) => {
      converterTimezones.toTimezone = e.target.value;
      localStorage.setItem('converterTimezones', JSON.stringify(converterTimezones));
      updateConvertedTime();
    });

    setInterval(updateConvertedTime, 1000);
