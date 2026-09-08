# Recharge Demo

> **React Native CLI demo** (bare workflow, **not Expo**).

A simple React Native CLI (bare, TypeScript) demo app for mobile recharge / bill
payment. Everything is mock data — no real auth, no real payments.

> Note: This is a **plain baseline app with NO WebEngage SDK** and no analytics
> of any kind. It exists as a clean starting point / reference. WebEngage (or any
> other SDK) can be layered on top later without touching the app logic.

## What it does

- **Login** — enter a name or skip as guest (state persists across restarts).
- **Home** — welcome message + a grid of plans loaded from JSON.
- **Details** — image, price, description, and an "add to cart" action.
- **Cart** — quantity steppers, totals, and a mock checkout alert.
- **Account** — shows the user/guest and a logout button.

All content lives in `src/data/catalog.data.json` (typed via `src/data/catalog.ts`),
so the app is domain-agnostic and can be repurposed by editing only the JSON.

## Tech

React Native 0.87 · TypeScript · React Navigation (native stack + bottom tabs) ·
React Context for state · AsyncStorage for persistence · react-native-vector-icons
(Ionicons, bundled natively).

Android package: `com.webengage.reactSample`

## Run (React Native CLI)

```sh
yarn install
npx pod-install ios        # iOS only
yarn android               # Android emulator/device
yarn ios                   # iOS simulator
```

Metro starts automatically; run it manually with `yarn start` if needed.
