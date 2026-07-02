# Git Cheat Sheet

## What is Git?

Git is a distributed version control system that helps developers track changes made to files over time. It allows developers to maintain different versions of a project, collaborate efficiently, and restore previous versions whenever needed.

---

## Why Do We Use Git?

Git helps us:

- Keep a history of every change made to a project.
- Recover previous versions if something goes wrong.
- Collaborate with multiple developers without overwriting each other's work.
- Experiment with new features safely using branches.
- Maintain a structured development workflow.

---

# Common Git Commands

## git init

Initializes a new Git repository in the current project folder.

---

## git status

Shows the current state of the repository, including modified, staged, and untracked files.

---

## git add

Moves selected files to the staging area, preparing them for the next commit.

Example:

```bash
git add README.md
```

or

```bash
git add .
```

---

## git commit

Creates a permanent checkpoint of the staged changes with a meaningful message.

Example:

```bash
git commit -m "Add Git documentation"
```

---

## git log

Displays the history of commits made to the repository.

---

## git clone

Downloads a copy of an existing remote repository to the local machine.

---

## git pull

Fetches the latest changes from the remote repository and merges them into the local branch.

---

## git push

Uploads local commits to the remote GitHub repository.

---

## git branch

Lists all branches or creates a new branch.

---

## git switch

Switches from one branch to another.

---

## git merge

Combines changes from one branch into another.

---

# Best Practices

- Write clear and meaningful commit messages.
- Commit small, logical changes instead of many unrelated changes together.
- Pull the latest changes before pushing your own work.
- Never commit unnecessary files such as temporary files or IDE settings.
- Use branches when developing new features.
- Keep the README up to date.
- Review changes before committing.