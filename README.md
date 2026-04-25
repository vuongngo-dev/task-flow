# 🧠 Productivity Hub

Todo + Pomodoro + Calendar + Focus Dashboard

Một ứng dụng productivity all-in-one xây dựng bằng:

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

---

# Features

## Task Management

- Add Task
- Edit Task
- Delete Task
- Complete Task
- Priority Levels
- Tags
- Due Dates
- Recurring Tasks
- Subtasks
- Task Search
- Task Filter
- Drag Drop Sorting

---

## Calendar Planner

- Daily Planner
- Weekly Planner
- Monthly Calendar
- Schedule Timeline
- Event Management
- Deadline Highlight

---

## Pomodoro Focus

- 25/5 Focus Timer
- Custom Session
- Short Break
- Long Break
- Focus Statistics
- Auto Cycle
- Alarm Sounds

---

## Authentication UI

- Login
- Register
- Forgot Password (UI mock)
- Session State
- Logout

---

## Dashboard

- Productivity Summary
- Today's Tasks
- Focus Time
- Completed Rate
- Charts
- Activity Logs

---

## Statistics

- Daily completion chart
- Weekly productivity
- Focus analytics
- Streak counter

---

## Settings

- Theme
- Dark Mode
- Sound
- Notifications
- Language
- Storage Settings

---

# Project Architecture

```bash
productivity-hub/
│
├── index.html
├── README.md
├── .gitignore
├── favicon.ico
│
├── assets/
│   │
│   ├── images/
│   │   ├── logo/
│   │   ├── backgrounds/
│   │   ├── illustrations/
│   │   └── screenshots/
│   │
│   ├── icons/
│   │   ├── navigation/
│   │   ├── task/
│   │   ├── settings/
│   │   └── pomodoro/
│   │
│   ├── sounds/
│   │   ├── focus-start.mp3
│   │   ├── break-bell.mp3
│   │   └── notification.mp3
│   │
│   └── fonts/
│
│
├── pages/
│   │
│   ├── dashboard.html
│   ├── tasks.html
│   ├── calendar.html
│   ├── pomodoro.html
│   ├── statistics.html
│   ├── settings.html
│   ├── login.html
│   ├── register.html
│   └── about.html
│
│
├── css/
│   │
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── typography.css
│   │   └── globals.css
│   │
│   ├── themes/
│   │   ├── light.css
│   │   ├── dark.css
│   │   └── themes.css
│   │
│   ├── layout/
│   │   ├── sidebar.css
│   │   ├── navbar.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── grid.css
│   │
│   ├── components/
│   │   ├── buttons.css
│   │   ├── forms.css
│   │   ├── cards.css
│   │   ├── modal.css
│   │   ├── dropdown.css
│   │   ├── calendar.css
│   │   ├── charts.css
│   │   ├── timer.css
│   │   └── notifications.css
│   │
│   ├── pages/
│   │   ├── dashboard.css
│   │   ├── tasks.css
│   │   ├── pomodoro.css
│   │   ├── stats.css
│   │   ├── settings.css
│   │   └── auth.css
│   │
│   └── main.css
│
│
├── js/
│   │
│   ├── core/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── stateManager.js
│   │   └── config.js
│   │
│   ├── models/
│   │   ├── Task.js
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── PomodoroSession.js
│   │
│   ├── services/
│   │   ├── taskService.js
│   │   ├── authService.js
│   │   ├── calendarService.js
│   │   ├── pomodoroService.js
│   │   ├── statsService.js
│   │   └── storageService.js
│   │
│   ├── modules/
│   │   │
│   │   ├── tasks/
│   │   │   ├── addTask.js
│   │   │   ├── editTask.js
│   │   │   ├── filterTasks.js
│   │   │   └── dragDrop.js
│   │   │
│   │   ├── calendar/
│   │   │   ├── monthView.js
│   │   │   ├── scheduler.js
│   │   │   └── events.js
│   │   │
│   │   ├── pomodoro/
│   │   │   ├── timer.js
│   │   │   ├── focusEngine.js
│   │   │   └── sessions.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── widgets.js
│   │   │   ├── analytics.js
│   │   │   └── charts.js
│   │   │
│   │   └── settings/
│   │       ├── themes.js
│   │       ├── preferences.js
│   │       └── notifications.js
│   │
│   ├── ui/
│   │   ├── renderer.js
│   │   ├── modals.js
│   │   ├── sidebar.js
│   │   ├── navbar.js
│   │   └── toast.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── validator.js
│   │   ├── formatter.js
│   │   ├── constants.js
│   │   └── dateUtils.js
│   │
│   └── data/
│       ├── sampleTasks.json
│       └── defaults.json
│
│
├── storage/
│   ├── schema.md
│   └── mockData.json
│
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── manual-checklist.md
│
│
└── docs/
    │
    ├── architecture.md
    ├── api.md
    ├── coding-rules.md
    ├── roadmap.md
    └── wireframes/
```

---

# Application Modules

## 1 Dashboard

```text
- Productivity summary
- Charts
- Today's focus
- Quick add task
- Streak counter
```

---

## 2 Task System

```text
Task Object

id
title
description
priority
dueDate
completed
tags
subtasks
createdAt
updatedAt
```

---

## 3 Pomodoro Engine

States:

```text
Idle
Focus
ShortBreak
LongBreak
Paused
Finished
```

Cycle:

```text
25 Focus
5 Break
25 Focus
5 Break
25 Focus
5 Break
25 Focus
15 Long Break
```

---

## 4 Calendar Scheduler

Views

```text
Day
Week
Month
Timeline
```

---

## 5 Statistics

Metrics

```text
Completion Rate
Focus Hours
Productivity Score
Consistency
Task Velocity
```

---

# Routing Map

```text
/
dashboard
/tasks
/calendar
/pomodoro
/statistics
/settings
/about
/login
/register
```

---

# Sidebar Navigation

```text
🏠 Dashboard
✅ Tasks
📅 Calendar
🍅 Pomodoro
📈 Statistics
⚙ Settings
ℹ About
```

---

# Local Storage Keys

```javascript
tasks
user_settings
pomodoro_sessions
calendar_events
theme_preferences
auth_session
stats_cache
```

---

# Coding Rules

## Folder Rules

Không file nào vượt:

```text
300-400 lines
```

Nếu vượt:

```text
split module
```

---

## Naming

```bash
camelCase → JS
PascalCase → classes
BEM → CSS
kebab-case → folders
```

---

## Architecture Rules

Không được:

❌ Business logic trong UI

❌ DOM code trong service

❌ Storage code trong components

---

Đúng:

```text
Model
Service
UI
Utils
```

Separation of Concerns.

---

# Future Upgrades

- PWA
- Cloud sync
- Firebase auth
- Team collaboration
- Kanban board
- Habit tracker
- Notes module

---

# Roadmap

Phase 1

- Todo CRUD

Phase 2

- Calendar

Phase 3

- Pomodoro

Phase 4

- Statistics

Phase 5

- PWA

---

# Git Branching

```bash
main
develop

feature/todo
feature/calendar
feature/pomodoro
feature/settings

bugfix/*
```

---

# Commit Convention

# 🧠 Productivity Hub

Todo + Pomodoro + Calendar + Focus Dashboard

Một ứng dụng productivity all-in-one xây dựng bằng:

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

---

# Features

## Task Management

- Add Task
- Edit Task
- Delete Task
- Complete Task
- Priority Levels
- Tags
- Due Dates
- Recurring Tasks
- Subtasks
- Task Search
- Task Filter
- Drag Drop Sorting

---

## Calendar Planner

- Daily Planner
- Weekly Planner
- Monthly Calendar
- Schedule Timeline
- Event Management
- Deadline Highlight

---

## Pomodoro Focus

- 25/5 Focus Timer
- Custom Session
- Short Break
- Long Break
- Focus Statistics
- Auto Cycle
- Alarm Sounds

---

## Authentication UI

- Login
- Register
- Forgot Password (UI mock)
- Session State
- Logout

---

## Dashboard

- Productivity Summary
- Today's Tasks
- Focus Time
- Completed Rate
- Charts
- Activity Logs

---

## Statistics

- Daily completion chart
- Weekly productivity
- Focus analytics
- Streak counter

---

## Settings

- Theme
- Dark Mode
- Sound
- Notifications
- Language
- Storage Settings

---

# Project Architecture

```bash
productivity-hub/
│
├── index.html
├── README.md
├── .gitignore
├── favicon.ico
│
├── assets/
│   │
│   ├── images/
│   │   ├── logo/
│   │   ├── backgrounds/
│   │   ├── illustrations/
│   │   └── screenshots/
│   │
│   ├── icons/
│   │   ├── navigation/
│   │   ├── task/
│   │   ├── settings/
│   │   └── pomodoro/
│   │
│   ├── sounds/
│   │   ├── focus-start.mp3
│   │   ├── break-bell.mp3
│   │   └── notification.mp3
│   │
│   └── fonts/
│
│
├── pages/
│   │
│   ├── dashboard.html
│   ├── tasks.html
│   ├── calendar.html
│   ├── pomodoro.html
│   ├── statistics.html
│   ├── settings.html
│   ├── login.html
│   ├── register.html
│   └── about.html
│
│
├── css/
│   │
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── typography.css
│   │   └── globals.css
│   │
│   ├── themes/
│   │   ├── light.css
│   │   ├── dark.css
│   │   └── themes.css
│   │
│   ├── layout/
│   │   ├── sidebar.css
│   │   ├── navbar.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── grid.css
│   │
│   ├── components/
│   │   ├── buttons.css
│   │   ├── forms.css
│   │   ├── cards.css
│   │   ├── modal.css
│   │   ├── dropdown.css
│   │   ├── calendar.css
│   │   ├── charts.css
│   │   ├── timer.css
│   │   └── notifications.css
│   │
│   ├── pages/
│   │   ├── dashboard.css
│   │   ├── tasks.css
│   │   ├── pomodoro.css
│   │   ├── stats.css
│   │   ├── settings.css
│   │   └── auth.css
│   │
│   └── main.css
│
│
├── js/
│   │
│   ├── core/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── stateManager.js
│   │   └── config.js
│   │
│   ├── models/
│   │   ├── Task.js
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── PomodoroSession.js
│   │
│   ├── services/
│   │   ├── taskService.js
│   │   ├── authService.js
│   │   ├── calendarService.js
│   │   ├── pomodoroService.js
│   │   ├── statsService.js
│   │   └── storageService.js
│   │
│   ├── modules/
│   │   │
│   │   ├── tasks/
│   │   │   ├── addTask.js
│   │   │   ├── editTask.js
│   │   │   ├── filterTasks.js
│   │   │   └── dragDrop.js
│   │   │
│   │   ├── calendar/
│   │   │   ├── monthView.js
│   │   │   ├── scheduler.js
│   │   │   └── events.js
│   │   │
│   │   ├── pomodoro/
│   │   │   ├── timer.js
│   │   │   ├── focusEngine.js
│   │   │   └── sessions.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── widgets.js
│   │   │   ├── analytics.js
│   │   │   └── charts.js
│   │   │
│   │   └── settings/
│   │       ├── themes.js
│   │       ├── preferences.js
│   │       └── notifications.js
│   │
│   ├── ui/
│   │   ├── renderer.js
│   │   ├── modals.js
│   │   ├── sidebar.js
│   │   ├── navbar.js
│   │   └── toast.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── validator.js
│   │   ├── formatter.js
│   │   ├── constants.js
│   │   └── dateUtils.js
│   │
│   └── data/
│       ├── sampleTasks.json
│       └── defaults.json
│
│
├── storage/
│   ├── schema.md
│   └── mockData.json
│
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── manual-checklist.md
│
│
└── docs/
    │
    ├── architecture.md
    ├── api.md
    ├── coding-rules.md
    ├── roadmap.md
    └── wireframes/
```

---

# Application Modules

## 1 Dashboard

```text
- Productivity summary
- Charts
- Today's focus
- Quick add task
- Streak counter
```

---

## 2 Task System

```text
Task Object

id
title
description
priority
dueDate
completed
tags
subtasks
createdAt
updatedAt
```

---

## 3 Pomodoro Engine

States:

```text
Idle
Focus
ShortBreak
LongBreak
Paused
Finished
```

Cycle:

```text
25 Focus
5 Break
25 Focus
5 Break
25 Focus
5 Break
25 Focus
15 Long Break
```

---

## 4 Calendar Scheduler

Views

```text
Day
Week
Month
Timeline
```

---

## 5 Statistics

Metrics

```text
Completion Rate
Focus Hours
Productivity Score
Consistency
Task Velocity
```

---

# Routing Map

```text
/
dashboard
/tasks
/calendar
/pomodoro
/statistics
/settings
/about
/login
/register
```

---

# Sidebar Navigation

```text
🏠 Dashboard
✅ Tasks
📅 Calendar
🍅 Pomodoro
📈 Statistics
⚙ Settings
ℹ About
```

---

# Local Storage Keys

```javascript
tasks
user_settings
pomodoro_sessions
calendar_events
theme_preferences
auth_session
stats_cache
```

---

# Coding Rules

## Folder Rules

Không file nào vượt:

```text
300-400 lines
```

Nếu vượt:

```text
split module
```

---

## Naming

```bash
camelCase → JS
PascalCase → classes
BEM → CSS
kebab-case → folders
```

---

## Architecture Rules

Không được:

❌ Business logic trong UI

❌ DOM code trong service

❌ Storage code trong components

---

Đúng:

```text
Model
Service
UI
Utils
```

Separation of Concerns.

---

# Future Upgrades

- PWA
- Cloud sync
- Firebase auth
- Team collaboration
- Kanban board
- Habit tracker
- Notes module

---

# Roadmap

Phase 1

- Todo CRUD

Phase 2

- Calendar

Phase 3

- Pomodoro

Phase 4

- Statistics

Phase 5

- PWA

---

# Git Branching

```bash
main
develop

feature/todo
feature/calendar
feature/pomodoro
feature/settings

bugfix/*
```

---

# Commit Convention

```bash
feat:
fix:
refactor:
docs:
style:
```

Example

```bash
feat: add pomodoro module
fix: resolve task filter bug
```

---

# License

MIT

```bash
feat:
fix:
refactor:
docs:
style:
```

Example

```bash
feat: add pomodoro module
fix: resolve task filter bug
```

---

# License

MIT
