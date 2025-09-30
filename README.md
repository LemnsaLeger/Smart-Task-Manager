
# 🎣 TaskFisher: Pomodoro Task Manager

A clean, minimalist application designed to help you catch and conquer your to-dos. TaskFisher blends simple task organization with the powerful productivity technique of the Pomodoro Timer, running entirely in your browser using **IndexedDB** for secure, private, and persistent storage.

## ✨ Features

TaskFisher is built around focused work sessions and intelligent project tracking to maximize your productivity.

### 🍅 Focused Work & Tracking

  * **Integrated Pomodoro Timer:** Start a focused work session directly on any task.
  * **Custom Intervals:** Set and save custom durations for Work, Short Break, and Long Break intervals. These settings are saved per-task, so the timer remembers your preferences.
  * **Time Tracking:** Automatically track and permanently save the **Total Time Taken** for any task once it's marked as complete.
  * **Completion Status:** When a task is completed, the timer stops, and the task status bar displays **"Completed\!"** instead of the due date.

### 📊 Project Management & Progress

  * **Project Completion:** Dynamic progress bars show the percentage of tasks completed within a project.
  * **"In Progress" Filter:** A project is automatically designated **"In Progress"** (and displayed in a dedicated section) if it has at least one associated task.
  * **Full CRUD:** Complete functionality (Create, Read, Update, Delete) for both Projects and Tasks.
  * **Today's Tasks:** Dedicated view to filter tasks by priority, due date, and custom tags.

### ⚙️ Technology

  * **React:** For the dynamic, component-based user interface.
  * **IndexedDB:** Used for all data storage, ensuring your tasks remain private, local, and load instantly.
  * **Tailwind CSS:** For a clean, modern, and utility-first design approach.

-----

## 🚀 Getting Started

Follow these steps to get TaskFisher running locally.

### Prerequisites

You must have **Node.js** and **npm** (or yarn/pnpm) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_TASKFISHER_REPO_URL]
    cd taskfisher
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will open in your browser, typically at `http://localhost:5173`.

-----

## 🎣 How to Use the Timer

1.  **Select a Task:** On the homepage, click any task to enter the **"Manage Task"** screen.
2.  **Set Intervals:** Click **"Set Work interval"** or **"Set break interval"** and choose your preferred time. This preference is saved to the task.
3.  **Start/Pause:** Use the **Play** and **Pause** icons to control your Pomodoro session.
4.  **Complete:** Click the **"Complete"** button when finished. The time you spent will be permanently saved, and the task will be marked complete across the app.

-----

## 🔑 Key Files

| File / Component | Function |
| :--- | :--- |
| `src/HomePage.jsx` | Main application logic, state management, data fetching, and percentage calculations. |
| `src/features/PomodoroTimer.jsx` | Houses the core timer logic and time tracking functionality. |
| `src/util/getDb.js` | Handles connection and versioning for IndexedDB. |
| `src/TaskPage.jsx` | Contains the `TodaysTasks` component, responsible for filtering tasks. |

-----
## 🤝 Contributing to TaskFisher

We welcome contributions of all kinds\! Whether it's reporting a bug, suggesting a new feature(themes, profile, etc), improving the documentation, or submitting a code change, your help makes TaskFisher better.

### 🐛 Reporting Bugs

If you find a bug, please help us by reporting it\!

1.  **Check Existing Issues:** Before submitting, please check the [Issues tab] on GitHub to see if the bug has already been reported.
2.  **Open a New Issue:** If it's new, open a new issue and use the **"Bug Report"** template (if provided, otherwise follow the guidelines below).
3.  **Be Specific:**
      * **Environment:** What browser and version are you using (e.g., Chrome 120, Firefox 118)?
      * **Steps to Reproduce:** List the clear, numbered steps that lead to the bug. (e.g., "1. Go to the Timer screen. 2. Click Start. 3. Refresh the page.")
      * **Expected Result:** What should have happened?
      * **Actual Result:** What actually happened?

### ✨ Suggesting Features

We love ideas\! If you have a suggestion for a new feature or enhancement:

1.  **Check Existing Issues:** Check the [Issues tab] to see if the feature has already been suggested.
2.  **Open a New Issue:** Open a new issue and label it as an **"Enhancement"** or **"Feature Request."**
3.  **Explain the "Why":** Clearly describe the feature and, most importantly, explain **why** it would be useful to the application or its users.

### 🧑‍💻 Code Contributions (Pull Requests)

Ready to write some code? Here is the standard workflow:

1.  **Fork the Repository:** Click the "Fork" button at the top right of the repository page.
2.  **Clone Your Fork:** Clone your forked repository to your local machine.
    ```bash
    git clone [YOUR_FORKED_REPO_URL]
    ```
3.  **Create a New Branch:** Always create a new branch for your changes. Use descriptive names like `fix/timer-sync` or `feature/task-filters`.
    ```bash
    git checkout -b feature/new-dashboard-view
    ```
4.  **Make Changes:** Write your code. Ensure you follow the existing code style and structure (e.g., component structure, variable naming).
5.  **Test Your Changes:** Run the app locally and thoroughly test that your changes work as expected and haven't introduced any new bugs.
6.  **Commit:** Commit your changes with a clear, concise message.
    ```bash
    git commit -m "feat: Add percentage completion to project cards"
    ```
7.  **Push:** Push your new branch to your forked repository on GitHub.
    ```bash
    git push origin feature/new-dashboard-view
    ```
8.  **Open a Pull Request (PR):**
      * Go to the original **TaskFisher** repository on GitHub.
      * GitHub will prompt you to create a Pull Request from your new branch.
      * Provide a clear title and description of your changes, referencing any relevant issue numbers (e.g., `Fixes #42`).

### **A Note on IndexedDB**

Since TaskFisher relies on **IndexedDB**, be mindful when changing the data structure. If you introduce a new required field (like `totalTimeTaken`), ensure your changes handle:

1.  **New Tasks:** Initializing the field with a default value in the creation logic.
2.  **Old Tasks:** Gracefully handling older tasks that might not have the field (e.g., using optional chaining `task.newField || defaultValue`).

-----

**Thank you for helping us fish for success\!** 🎣
**TaskFisher: Catch your tasks, focus your time.**