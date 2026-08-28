# Developer Hub Test Task

React Native CLI project (not Expo). Work for this pass lives on the `Test_Task_2` branch.

The app opens on **Home**, which runs the Battle Winner Ceremony — a staged Reanimated animation sequence with two mock creators, score lock, winner reveal, and interrupt-safe replay.

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
git checkout Test_Task_2
```

If the repository is already on disk:

```sh
git fetch origin
git checkout Test_Task_2
```

### Step 2. Install JavaScript packages

From the project root:

```sh
npm install
```

### Step 3. Install iOS pods (iOS only)

Run this the first time you clone, and again after native dependency changes (`react-native-reanimated`, `react-native-worklets`, `react-native-localize`, or `react-native-keychain`):

```sh
bundle install
bundle exec pod install --project-directory=ios
```

Or from the `ios` folder (do not run `cd ios` twice):

```sh
cd ios
pod install
cd ..
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

The app opens on Home with the Winner Ceremony. The first launch can take several minutes while Xcode builds.

To target a specific simulator:

```sh
npx react-native run-ios --simulator="iPhone 16"
```

### Step 6. Run on Android

Start an emulator from Android Studio (Device Manager), then in a second terminal:

```sh
npm run android
```

### Step 7. Run unit tests (optional)

```sh
npm test -- --watchAll=false --watchman=false
```

## What you should see

1. Two creator cards in a VS layout with a 5-second animated countdown.
2. Score lock pulse on both cards when the countdown hits zero.
3. Loser recedes while the winner moves to center with gold treatment.
4. CHAMPION title enters with spring choreography and gold particles burst.
5. Watch Replay and Back to Stage buttons animate in at the end.
6. **Replay Ceremony** (top of screen) safely restarts the sequence at any moment.

Dark appearance is recommended for the intended near-black, gold-accented look. Change it in Settings via Home if needed.

## Project layout

`App.tsx` hydrates language and theme, and mounts navigation.

`src/screens/Home/ui/HomeScreen.tsx` — hosts the Winner Ceremony UI (plus Language → Settings).

`src/components/ui/` — ceremony UI pieces (cards, countdown, champion title, particles, buttons).

`src/components/styles/` — styles for those shared components.

`src/screens/WinnerCeremony/` — sequence hook, screen styles, and mock data.

`src/navigation/RootNavigator.tsx` — native stack; Home is the initial route.

## Technical Decisions

### Why Reanimated

React Native Reanimated runs the ceremony choreography on the UI thread via shared values and animated styles. Card transforms, score lock pulses, champion entrance, and resolution buttons avoid per-frame React re-renders. Only the countdown digit and replay key use React state.

### Sequence orchestration

`useCeremonySequence` drives a staged timeline: countdown → score lock → winner/loser reveal → gold treatment → CHAMPION title → particles → resolution buttons. Each stage schedules the next with guarded timeouts that check an active generation id before running.

### Replay interruption

Each replay increments a generation counter, clears JS timers, calls `cancelAnimation` on every shared value, resets all values to initial state, and starts Stage 1 again. Stale timeouts and animation callbacks from prior runs are ignored when their generation no longer matches.

### Performance

Animations use `withTiming`, `withSpring`, and `withSequence` on shared values. Particle count is capped at 16. Creator cards compose a single animated transform per side. No sound, network, or heavy layout work runs during the sequence.

### Animation sequencing (one sentence)

The ceremony builds suspense with the countdown and score lock, then shifts hierarchy by receding the loser and elevating the winner before celebrating with the CHAMPION title and particles, ending with resolution buttons so the viewer can breathe after the climax.

## With more time

- Richer particle shapes, trails, and haptic feedback on score lock
- VoiceOver labels and reduced-motion support
- Dynamic winner data from props or navigation params
- Tablet and landscape adaptive layouts
- Finer motion polish (easing curves, camera-style parallax)
- Unit tests for `resolveBattleOutcome` and replay generation safety

## Screen recording checklist

Use a 30–60 second capture (iOS Simulator or device):

1. Launch app — show VS layout and countdown starting at **5**.
2. Let countdown reach **0** — show score lock pulse on both cards.
3. Show loser dimming/receding and winner moving center with gold glow.
4. Show **CHAMPION** spring entrance and particle burst.
5. Show **Watch Replay** and **Back to Stage** buttons animating in.
6. Tap **Replay Ceremony** during an active animation (e.g. mid-countdown or during winner movement).
7. Confirm clean restart with no overlapping animations or crashes.
8. Optional: tap Replay rapidly 2–3 times to verify stability.
