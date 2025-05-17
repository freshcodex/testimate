# Contributing to Testimate

First off, thank you for considering contributing to Testimate! It's people like you that make Testimate such a great tool.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and effective collaboration process.

## Table of Contents

- [Contributing to Testimate](#contributing-to-testimate)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Copy the .env.example file](#copy-the-envexample-file)
  - [Create a new Supabase project](#create-a-new-supabase-project)
  - [Create a new Mux project](#create-a-new-mux-project)
  - [Run the application](#run-the-application)
    - [Building for **Production**](#building-for-production)
  - [Project Structure](#project-structure)
  - [Pull Request Process](#pull-request-process)
  - [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc` if available, otherwise latest LTS)
- pnpm (or your preferred package manager: npm, yarn)

### Installation

1.  **Fork the repository:** Click the "Fork" button on the GitHub repository page.
2.  **Clone your fork:**
    ```bash
    git clone https://github.com/bishaln/testimate.git
    cd testimate
    ```
3.  **Install dependencies:**
    ```bash
    pnpm install
    ```

## Copy the .env.example file

```bash
cp .env.example .env
```

This will create a `.env` file with the correct environment variables.

## Create a new Supabase project

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Copy the `SUPABASE_URL` , `SUPABASE_ANON_KEY` , `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project.
3. Paste them into the `.env` file.
4. Migrate the database:
   ```bash
   pnpm db:migrate
   ```
5. Create a public bucket in supabase storage. make sure to set the public access to true.

## Create a new Mux project

1. Go to [Mux](https://mux.com/) and create a new project.
2. Copy the `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET` and `MUX_WEBHOOK_SECRET` from the Mux project.
3. Paste them into the `.env` file.

## Run the application

```bash
pnpm dev
```

This start the application on `http://localhost:3000`.

### Building for **Production**

To build the application for production, run:

```bash
pnpm build
# or npm run build / yarn build
```

## Project Structure

The project follows a specific directory structure to maintain organization and clarity:

```
src/
├── app/         # Next.js app router pages and layouts
├── components/  # Reusable React components
├── lib/         # Utility functions and shared logic
├── server/      # Server-side code (e.g., API handlers, database interactions)
│   └── db/      # Database schema and configurations
├── styles/      # Global styles and Tailwind CSS configuration
├── supabase/    # Supabase specific configurations (if used)
└── trpc/        # tRPC router, procedures, and context (if used)
```

## Pull Request Process

1.  **Ensure your fork is up-to-date:**
    ```bash
    git remote add upstream https://github.com/ORIGINAL_OWNER/testimate.git # If not already added
    git fetch upstream
    git checkout main # Or your development branch
    git merge upstream/main
    ```
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b <type>/<short-description>
    # e.g., git checkout -b feat/user-profile-page
    # e.g., git checkout -b fix/login-button-bug
    ```
3.  **Make your changes:** Write clean, well-documented, and tested code.
4.  **Test your changes thoroughly.**
5.  **Commit your changes** following the [Commit Message Guidelines](#commit-message-guidelines).
6.  **Push your branch** to your fork:
    ```bash
    git push origin <branch-name>
    ```
7.  **Open a Pull Request (PR)** to the `main` branch (or the designated development branch) of the original repository.
    - Provide a clear title and description for your PR.
    - Link any relevant issues.
    - Ensure all automated checks (CI, linting, tests) pass.
8.  **Collaborate:** Be prepared to discuss your changes and make adjustments based on feedback from maintainers.
9.  Once approved and merged, your contributions will be part of Testimate!

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior. (We should add a `CODE_OF_CONDUCT.md` file - for now, please maintain a respectful and collaborative environment).

---

Thank you for contributing!
