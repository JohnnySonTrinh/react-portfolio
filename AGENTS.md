# AGENTS.md

## Purpose
This file tells coding agents how to work safely and efficiently in this repository. Follow these instructions before making changes.

## Project Overview
- This is a React 18 portfolio app with Vercel-style serverless functions.
- Frontend code lives in `src/`.
- Serverless API routes live in `api/`.
- Shared portfolio content lives in `shared/profile.json`.
- `public/profile.json` is generated from `shared/profile.json` by `scripts/sync-profile.js`.

## Core Rules
- Keep changes small, focused, and consistent with the current style.
- Prefer updating existing components, hooks, and data files instead of adding duplicates.
- Add short, useful comments when refactoring so non-obvious logic is easy to revisit later.
- Do not hardcode secrets, API keys, or private personal data.
- Do not manually edit `public/profile.json` unless the task is specifically about generated output. Update `shared/profile.json` instead, then sync.
- Preserve the Halo-inspired visual style and current navigation patterns unless the task explicitly asks for a redesign.
- Avoid unnecessary dependency changes.
- If a task touches chat, voice, contact, or profile data, verify the related env vars and data flow before editing.

## Working Agreement
1. Read the relevant files first.
2. Understand whether the change belongs in `src/`, `api/`, `shared/`, or `scripts/`.
3. Make the smallest correct change.
4. Run targeted verification when possible.
5. Summarize what changed and mention any follow-up risk or missing verification.

## Commands
- Install dependencies: `npm install`
- Start local app: `npm start`
- Build production bundle: `npm run build`
- Run tests: `npm test -- --watch=false`
- Sync shared profile data: `npm run sync:profile`

## Architecture Notes

### Frontend
- Pages live under `src/pages/`.
- Reusable UI lives under `src/components/`.
- Shared client logic lives under `src/hooks/`, `src/data/`, and `src/utils/`.
- Styles are mostly plain CSS files under `src/styles/`.

### API
- `api/chat.js` handles the OpenAI-backed chat route.
- `api/systemMessage.js` builds the portfolio-aware system prompt.
- API changes should preserve current request and response shapes unless the task requires coordinated frontend updates.

### Content Flow
- Main source of truth: `shared/profile.json`
- Sync step: `scripts/sync-profile.js`
- Frontend read target: `public/profile.json`

If profile content changes, run `npm run sync:profile` so the frontend copy stays in sync.

## Environment Variables
These may be required depending on the task:
- `OPENAI_API_KEY`
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_USER_ID`
- `REACT_APP_VAPI_PUBLIC_KEY`
- `REACT_APP_VAPI_AGENT_ID`

Rules:
- Never commit real secret values.
- Use existing env variable names.
- If a feature depends on missing env vars, fail clearly instead of silently.

## File-Specific Guidance

### `shared/profile.json`
- Treat this as the canonical source for portfolio content.
- Keep schema changes backward compatible unless all consumers are updated together.

### `public/profile.json`
- Generated file. Prefer syncing rather than hand-editing.

### `src/hooks/`
- Check whether a hook already owns the behavior before adding new state elsewhere.
- Keep localStorage keys stable unless a migration is intentional.

### `src/styles/`
- Reuse the current visual language.
- Prefer extending existing style files for page-level changes instead of scattering new CSS.

## Testing Expectations
- For UI changes, run at least a build or relevant tests when possible.
- For API changes, verify request validation, error handling, and client compatibility.
- For profile/content changes, sync the generated profile file and sanity-check affected pages.

## Good Change Patterns
- Update source data, then sync generated data.
- Extend existing hooks/components before creating new abstractions.
- Prefer comments that explain why a helper or code path exists, not comments that narrate every line.
- Keep accessibility labels and keyboard interactions intact.
- Preserve route-aware behavior in the assistant features.

## Avoid
- Editing generated output as the primary source of truth.
- Renaming public APIs or data fields without checking consumers.
- Large refactors unrelated to the task.
- Introducing a new framework, state library, or styling system without explicit approval.

## Handoff Notes
When finishing work, mention:
- What changed
- Whether `shared/profile.json` was synced
- What verification was run
- Any remaining risks, assumptions, or env-dependent limitations
