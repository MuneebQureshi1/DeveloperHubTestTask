# Stage Feed

Vertical, full screen performance feed for the Developer Hub test task. The app is a React Native CLI project (not Expo). Work for this pass lives on the `Test_TasK_1` branch.

The Home screen is a snap paging feed of 10 mock performances. Each item fills the screen with looping video, creator details, Follow / Following, Applaud with a clap burst, and a Battle chip on three items.

## Prerequisites

Complete these before cloning.

1. Install Node.js 22.11.0 or newer.
2. Install Watchman (macOS) if Metro file watching is unreliable.
3. Follow the official React Native environment guide for your machine: https://reactnative.dev/docs/set-up-your-environment
4. For iOS: install Xcode, CocoaPods, and the iOS Simulator.
5. For Android: install Android Studio, a JDK, an emulator (or a USB device with USB debugging), and accept the Android SDK licenses.

Confirm Node is ready:

```sh
node -v
npm -v
```

## Setup

### Step 1. Get the source

Clone the repository and switch to this task branch:

```sh
git clone https://github.com/MuneebQureshi1/DeveloperHubTestTask.git
cd DeveloperHubTestTask
git checkout Test_TasK_1
```

If the repository is already on disk:

```sh
git fetch origin
git checkout Test_TasK_1
```

### Step 2. Install JavaScript packages

From the project root:

```sh
npm install
```

### Step 3. Install iOS pods (iOS only)

Run this the first time you clone, and again after native dependency changes (`react-native-video`, `react-native-localize`, or `react-native-keychain`):

```sh
bundle install
bundle exec pod install --project-directory=ios
```

Skip this step if you only plan to run Android.

### Step 4. Start Metro

In the first terminal, from the project root:

```sh
npm start
```

Leave this process running. If Metro was already running with a stale cache, stop it and start with a reset:

```sh
npm start -- --reset-cache
```

### Step 5. Run on iOS

In a second terminal:

```sh
npm run ios
```

The app opens on the Stage Feed (Home) screen. The first launch can take several minutes while Xcode builds.

To target a specific simulator:

```sh
npx react-native run-ios --simulator="iPhone 16"
```

### Step 6. Run on Android

Start an emulator from Android Studio (Device Manager), then in a second terminal:

```sh
npm run android
```

The app opens on the Stage Feed (Home) screen.

### Step 7. Run unit tests (optional)

```sh
npm test -- --watchAll=false --watchman=false
```

This covers count formatting and Battle countdown edge cases in `__tests__/formatters.test.ts`, plus a smoke render of `App`.

## What you should see

1. Swipe vertically. Each swipe lands on one full screen performance.
2. Overlay text shows creator name and talent category, for example `Amara K. • Spoken Word`.
3. Tap Follow. The label switches to Following. Tap again to undo.
4. Tap the clap. The count increments, the button scales, and a clap burst animates.
5. On Sofia P. (Jazz Vocals) the gold chip reads `Battle in 1h 24m` and ticks down.
6. On Elena V. (Piano) the chip is red and reads `Battle Live` because that timestamp is already in the past.
7. On Luca B. (Acoustic Guitar) the chip reads `Battle in 2h 15m`.
8. Open Settings from the Language control to change language or appearance. This is extra to the brief.

## Project layout

`App.tsx` starts the shared clock, hydrates language and theme, and mounts navigation.

`src/navigation/RootNavigator.tsx` is a native stack. Home is the initial route. Settings is optional.

`src/screens/Home/ui/HomeScreen.tsx` owns the vertical `FlatList`, follow state, and applause counts.

`src/components/common/PerformanceFeedItem.tsx` renders one performance: video, overlay, Follow, Applaud, Battle chip.

`src/components/ui/ApplaudButton.tsx` and `src/components/ui/ClapBurst.tsx` handle the clap animation.

`src/components/ui/BattleChip.tsx` reads the shared clock and shows countdown or Battle Live.

`src/constants/performances.json` is the local mock feed (10 items).

`src/constants/constantsArray.ts` loads that JSON and turns Battle offsets into ISO timestamps.

`src/store/useCurrentTimeStore.ts` ticks once per second for countdown chips only.

`src/store/useLanguageStore.ts` and `src/store/useThemeStore.ts` persist language and appearance in the OS keychain.

## Mock data

The brief asked for a local JSON array of 8 to 10 items. The source of truth is `src/constants/performances.json`.

Each object has `id`, `creatorName`, `talentCategory`, `media` (a public MP4 URL), and `applauseCount`. Three objects also have `battleStartsAtOffsetMinutes`:

1. `84` on Sofia P. so the chip starts at about `Battle in 1h 24m`.
2. `-10` on Elena V. so the chip starts as `Battle Live`.
3. `135` on Luca B. so the chip starts at about `Battle in 2h 15m`.

JSON cannot call `Date.now()`, so offsets are stored instead of frozen ISO strings. `constantsArray.ts` maps each offset to `battleStartsAt` at launch. That keeps the countdown demo valid every time the app starts.

## Feed and scroll

Home uses a vertical `FlatList`, not a `ScrollView`, so only a small window of rows stays mounted.

1. Item height is the measured viewport. `getItemLayout` uses that height so paging math stays exact.
2. iOS uses `pagingEnabled`. Android uses `snapToInterval` plus `disableIntervalMomentum`.
3. `initialNumToRender={1}` mounts the first clip only.
4. `maxToRenderPerBatch={1}` adds at most one extra row per batch.
5. `windowSize={3}` keeps roughly the current row and its two neighbors in memory.
6. `onViewableItemsChanged` (80% visible) marks the active item. Only that player plays and unmutes. Neighbors stay paused.

## Battle countdown

`App.tsx` starts `useCurrentTimeStore` on mount and clears the interval on unmount.

`BattleChip` is the only UI that subscribes to `now`. Items without a battle do not re-render from the clock.

`getBattleStatus` in `src/utils/formatters.ts`:

1. Missing or invalid `battleStartsAt` returns nothing (no chip).
2. A timestamp in the past returns live (red `Battle Live`).
3. A timestamp in the future returns remaining milliseconds, formatted as `1h 24m`, then minutes, then seconds.

When remaining time hits zero, the same chip flips to live without a remount.

## State

Follow and applause live on Home as records keyed by performance id. Item-local state would reset when `FlatList` recycles a row. Updates are immutable. `React.memo` on `PerformanceFeedItem` skips rows whose follow and applause props did not change.

Language and theme are Zustand stores, not React context, and they persist in the keychain. Follow and applause are not persisted, matching the brief.

## Theme and media

Dark palette is near black (`#0A0A0A`), white overlay text, and gold (`#D4A94A`) on the Battle chip and a few accents. A light palette exists in Settings. Overlay copy on video stays high contrast in both modes.

Media is remote MP4 through `react-native-video`, full bleed, `resizeMode="cover"`, looping. This is local autoplay of stock clips, not a live streaming pipeline.

## With more time

1. Prefetch and cache the next clip so the first frame is ready before the swipe lands.
2. Serve HLS / adaptive bitrate instead of a single MP4 URL.
3. Load the feed from a backend and persist follow plus applause.
4. Accessibility pass: reduced motion, larger hit targets, screen reader order.
5. Broader unit coverage and E2E swipe tests.
6. A 30 to 60 second screen recording of the running app (required deliverable, not in this repo yet).
