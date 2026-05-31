# Git Workflow & Pull Request Guidelines

## Purpose

This repository follows a Pull Request (PR) workflow to maintain code quality, encourage collaboration, and ensure that all changes are reviewed before being merged into the main branch.

---

## Branch Protection Policy

The `main` branch is protected and cannot receive direct commits or pushes.

All changes must:

1. Be developed in a separate branch.
2. Be submitted through a Pull Request.
3. Pass all required checks.
4. Receive approval before merging.

Direct pushes to `main` are prohibited except for repository administrators when necessary.

---

## Branch Naming Convention

Use descriptive branch names based on the type of work being performed.

### Features

```text
feature/user-authentication
feature/order-system
feature/dashboard-redesign
```

### Bug Fixes

```text
fix/login-validation
fix/navbar-overflow
fix/payment-processing
```

### Refactoring

```text
refactor/user-service
refactor/database-queries
```

### Documentation

```text
docs/api-documentation
docs/setup-guide
```

### Maintenance

```text
chore/update-dependencies
chore/config-cleanup
```

---

## Commit Message Convention

All commits should follow the Conventional Commits specification.

### Format

```text
type: short description
```

### Examples

```text
feat: add user authentication
fix: resolve login validation issue
docs: update installation guide
refactor: simplify database queries
chore: update dependencies
test: add unit tests for user service
```

### Common Types

| Type     | Description                                  |
| -------- | -------------------------------------------- |
| feat     | New feature                                  |
| fix      | Bug fix                                      |
| docs     | Documentation changes                        |
| refactor | Code restructuring without changing behavior |
| test     | Adding or updating tests                     |
| chore    | Maintenance tasks and configuration updates  |

---

## Pull Request Process

### Step 1: Create a Branch

Create a branch from the latest version of `main`.

```bash
git checkout main
git pull origin main
git checkout -b feature/example-feature
```

### Step 2: Develop and Commit

Make changes and commit regularly using meaningful commit messages.

```bash
git add .
git commit -m "feat: add user authentication"
```

### Step 3: Push Branch

```bash
git push origin feature/example-feature
```

### Step 4: Create Pull Request

Open a Pull Request against the `main` branch.

PR titles should follow the same format as commit messages.

Examples:

```text
feat: implement user authentication
fix: correct order total calculation
docs: update API setup instructions
```

---

## Pull Request Requirements

Before requesting a review, ensure:

* Code compiles successfully.
* Existing functionality remains unaffected.
* New functionality has been tested.
* No unnecessary files are included.
* Merge conflicts are resolved.
* Documentation is updated when applicable.

---

## Pull Request Template

### Summary

Briefly describe the purpose of the changes.

### Changes Made

* Added ...
* Updated ...
* Fixed ...

### Testing

Describe how the changes were tested.

### Screenshots

Include screenshots if the changes affect the user interface.

### Additional Notes

Any information reviewers should know.

---

## Code Review Guidelines

Reviewers should verify:

* Code quality and readability.
* Consistency with project standards.
* Correct functionality.
* Security considerations.
* Performance implications.
* Proper documentation.

Feedback should be constructive, specific, and actionable.

---

## Merging Rules

A Pull Request may be merged only when:

* Required approvals have been received.
* All required checks have passed.
* No unresolved review comments remain.
* The branch is up to date with `main`.

Preferred merge method:

```text
Squash and Merge
```

This keeps commit history clean and easier to maintain.

---

## Recommended Repository Settings

Enable the following GitHub branch protection settings:

* Require a pull request before merging
* Require approvals
* Dismiss stale approvals when new commits are pushed
* Require status checks to pass before merging
* Restrict direct pushes to protected branches
* Prevent bypassing branch protection rules

---

Following these guidelines helps maintain a clean codebase, consistent history, and a reliable development workflow.
