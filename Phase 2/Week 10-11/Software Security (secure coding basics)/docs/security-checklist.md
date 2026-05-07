# Software Security Checklist

## 1. Data Validation & Sanitization
- [x] Client-side input length limits enforced (Max 200 chars for questions).
- [x] HTML tags (`<`, `>`) escaped/rejected to prevent Cross-Site Scripting (XSS).
- [x] Pure functions (`createFlashcard`) validate variable types before execution.

## 2. Authentication & Authorization
- [x] Implemented token-based session verification via `localStorage`.
- [x] Role-based UI rendering: Edit and Delete buttons are hidden from non-authenticated users.

## 3. Secrets Management
- [x] CI/CD pipeline uses GitHub Secrets for deployment tokens (no hardcoded API keys in `.yml` files).
- [x] `.env` files are included in `.gitignore` to prevent leaking local environment variables.

## 4. Auditing & Logging
- [x] Ran `npm audit` to verify third-party dependency safety.
- [x] **Accepted Risk Documented:** Identified 26 transitive build-time vulnerabilities nested within the `react-scripts` compiler architecture. Since these flaws execute solely within the build/CI environment and do not compile into the final client-side production bundle, they are classified as an accepted risk.
- [x] Implemented automated `npm audit` in the GitHub Actions CI pipeline with a non-blocking configuration to accommodate accepted risks.

## 5. Principle of Least Privilege
- [x] Unauthenticated users are restricted strictly to "Quiz Mode" and "View" access.