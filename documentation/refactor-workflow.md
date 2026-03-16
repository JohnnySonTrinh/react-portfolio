# Refactor Workflow

## Purpose
This document defines how refactors should be approached in this repository so changes stay focused, reviewable, and low risk.

## Core Principles
- Refactor one responsibility at a time.
- Preserve behavior unless the change explicitly includes a UX or product update.
- Prefer extracting helpers over introducing new abstractions too early.
- Keep changes easy to review and easy to roll back.
- Add short comments around non-obvious logic so the next pass is easier.

## Refactor Unit Rule
Each refactor PR should focus on one of these units:
- one hook
- one component pair
- one page flow
- one API client
- one small utility cluster

Avoid bundling unrelated cleanup into the same PR.

## Required Planning Step
Before writing code, define:
- what the file or flow currently does
- what responsibilities are mixed together
- what should be extracted or simplified
- what must not change
- how the change will be verified

If the scope starts expanding during planning, split it into multiple PRs.

## Standard Refactor Sequence
1. Read the relevant files and current consumers.
2. Identify mixed responsibilities, duplication, or unclear data flow.
3. Extract pure helpers first.
4. Simplify hook or component orchestration second.
5. Clean up props or public APIs last.
6. Add brief comments where logic is not obvious.
7. Run targeted verification.
8. Commit only the focused refactor.

## Guardrails
- Do not change API request or response shapes unless all consumers are updated together.
- Do not rename localStorage keys unless a migration is planned.
- Do not manually edit generated output as the source of truth.
- Do not mix styling redesigns into logic refactors.
- Do not add dependencies unless they are clearly necessary.
- Do not rename files or components just because the internal code was cleaned up.

## Commenting Rules
- Add comments that explain why a helper, state transition, or effect exists.
- Keep comments short and practical.
- Do not narrate obvious lines of code.
- Prefer comments near persistence, sanitization, async flows, stream parsing, or reset logic.

## Verification Rules
- Run the smallest useful verification for the change.
- Prefer targeted tests when they exist.
- If no targeted tests exist, use a build or compile check.
- If verification cannot run, record the exact reason in the PR.
- If a command triggers generated output, mention that in the PR summary.

## PR Rules
Each refactor PR should include:
- a short summary of the refactor target
- what changed
- what did not change
- verification performed
- known follow-up work

Recommended PR size:
- ideally 1 to 5 files for focused hook or component refactors
- avoid broad PRs unless the work is tightly connected

## Repo-Specific Notes

### Shared Content
- `shared/profile.json` is the source of truth.
- `public/profile.json` is generated through `scripts/sync-profile.js`.
- If content changes, note whether sync was run.

### Chat And Assistant Flows
- Preserve route-aware assistant behavior.
- Keep chat and voice flows stable unless that is the explicit task.

### Contact Flow
- Keep field-level validation separate from form-level submission errors.
- Do not silently swallow send failures.

### Styling
- Preserve the current Halo-inspired visual direction unless a redesign is requested.
- Avoid mixing visual cleanup with state-management refactors.

## Recommended Refactor Order
Suggested next targets after the current form work:

1. `src/hooks/useChatbot.js`
- likely contains mixed streaming, persistence, and UI state

2. `src/hooks/useVoiceAssistant.js`
- likely contains mixed event wiring and assistant session state

3. `src/App.js`
- clean up app shell versus route composition if needed

4. `src/api/profileClient.js`
- align small client request patterns

5. page-level menu components
- only after the supporting hooks are cleaner

## Refactor Checklist
Use this checklist before opening a PR:

- Scope is limited to one responsibility
- Plan was written before code changes
- Non-obvious logic has comments
- Behavior stayed the same unless explicitly intended
- Verification was attempted and recorded
- PR notes include follow-up work instead of bundling it now
