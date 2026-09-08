# Changelog

All notable changes to this project are documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Changed
- Renamed the Android package / applicationId from `com.rechargedemo` to
  `com.webengage.reactSample`. Moved the Kotlin sources
  (`MainActivity.kt`, `MainApplication.kt`) to the matching package directory
  and updated `namespace` / `applicationId` in `android/app/build.gradle`.
- Simplified the README into a short reference note and clarified that this is a
  plain baseline app with **no WebEngage SDK** and no analytics.

### Added
- Added this CHANGELOG.

### Fixed
- Fixed a runtime crash (`Cannot read property 'title' of undefined`) caused by
  Metro resolving `../data/catalog` to `catalog.json` instead of the typed
  `catalog.ts` accessor (same basename collision). Renamed the data file to
  `catalog.data.json` so imports resolve to the accessor.

## [0.0.1] - Initial demo

### Added
- React Native 0.87 CLI (bare) app in TypeScript: **Recharge Demo**, a mock
  mobile recharge / bill-payment demo (no real auth, no real payments).
- Navigation with `@react-navigation/native` — native stack wrapping bottom tabs
  (Home, Cart, Account) plus a pushed Details screen. Peers installed:
  `react-native-screens`, `react-native-safe-area-context`,
  `react-native-gesture-handler`.
- Data-driven content: all copy and products live in a single JSON file with a
  generic app-config block and a typed accessor, so the app can be repurposed by
  editing only the JSON.
- Screens: Login (name or guest), Home (welcome + guest badge + plan grid),
  Details (image/price/description + primary action), Cart (quantity steppers,
  totals, mock checkout alert, empty state), Account (name/guest + logout).
- Shared state via React Context (auth + cart), both persisted with
  `@react-native-async-storage/async-storage` and rehydrated on launch.
- Icons via `react-native-vector-icons` (Ionicons), with fonts bundled natively
  for Android (`fonts.gradle`) and iOS (`UIAppFonts`).
- Light/dark-friendly theming that follows the OS setting.
