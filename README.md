# Developer Hub — Battle Winner Reveal

React Native CLI app (not Expo) for **Task 2**: a staged Battle “Winner Reveal” ceremony.

The app opens on **Home**. Two hardcoded creators face off in a VS layout; a 5-second countdown stands in for the real 20 seconds; then scores lock, the winner takes the stage, and resolution controls appear.

Branch: `Test_Task_2`

---

## Preview

Final frame after the ceremony (dark theme). Gold is reserved for the champion — title, card glow/border, and score. The loser recedes behind the winner. **Replay Ceremony**, **Watch Replay**, and **Back to Stage** only appear after the sequence finishes.

![Winner Reveal ceremony — final dark-theme frame. Trophy and gold CHAMPION title above Amara K.’s winning card (score 120) with gold glow; Marcus T. receded behind; Watch Replay and Back to Stage at the bottom; Light, Replay Ceremony, and Language in the top bar.](docs/ceremony-final-dark.png)

| | |
| --- | --- |
| Winner | Amara K. — Spoken Word — **120** |
| Loser | Marcus T. — Beatbox — **98** |
| Theme | Near-black background, white type, gold accents only on the winner |

Light theme is available from the **☀️ Light / 🌙 Dark** chip on Home (top left).

---

## What the sequence does

Auto-plays on mount. No live data, video, or sound.

### Stage 1 — Score lock

- Two creator cards sit side by side with a **VS** badge.
- A **5-second** countdown pulses down (stand-in for 20s).
- Scores roll up toward their finals during the countdown.
- On **0**, both counters **lock**: a short flash/pulse, numbers freeze.

### Stage 2 — Winner reveal

- Loser’s card dims, scales down, and recedes.
- Winner springs to **center**, scales up, and gets gold treatment (border + glow). Score turns gold.
- **CHAMPION** enters with a **per-letter spring stagger** (not a fade-only). Trophy + gold underline.
- Hand-rolled **confetti** (Reanimated, 36 pieces) bursts over the stage.

### Stage 3 — Resolution

Only after the climax:

- **Watch Replay** and **Back to Stage** slide in (no-ops).
- **Replay Ceremony** appears in the top bar.

Tapping **Replay Ceremony** hides those controls immediately, cancels in-flight work, and restarts Stage 1. Rapid taps should not stack animations or crash.

---

## Stack

| | |
| --- | --- |
| Runtime | React Native **0.87**, React **19**, TypeScript |
| Animation | **Reanimated 4** (UI-thread worklets, shared values) |
| Navigation | React Navigation native stack (Home → Settings) |
| State | Zustand (theme + language) |
| i18n | i18next + react-native-localize |

Out of scope for this task: real video, live scores, audio, the Battle itself.

---

## Prerequisites

1. **Node.js 22.11.0+** (`node -v` / `npm -v`)
2. **Watchman** on macOS if Metro file watching is flaky
3. Official RN environment: https://reactnative.dev/docs/set-up-your-environment
4. **iOS:** Xcode, CocoaPods, Simulator
5. **Android:** Android Studio, JDK, emulator (or a USB device with debugging), SDK licenses accepted

---

## Setup

### 1. Clone and branch

```sh
git clone https://github.com/MuneebQureshi1/DeveloperHubTestTask.git
cd DeveloperHubTestTask
git checkout Test_Task_2
```

Already cloned:

```sh
git fetch origin
git checkout Test_Task_2
```

### 2. JavaScript packages

```sh
npm install
```

### 3. iOS pods (iOS only)

First clone, and again after native deps change (`react-native-reanimated`, `react-native-worklets`, `react-native-localize`, `react-native-keychain`):

```sh
bundle install
bundle exec pod install --project-directory=ios
```

Or:

```sh
cd ios && pod install && cd ..
```

Skip this step for Android-only.

### 4. Metro

```sh
npm start
```

Stale cache:

```sh
npm start -- --reset-cache
```

### 5. iOS

```sh
npm run ios
```

First Xcode build can take several minutes. Specific simulator:

```sh
npx react-native run-ios --simulator="iPhone 16"
```

### 6. Android

Start an emulator, then:

```sh
npm run android
```

### 7. Tests (optional)

```sh
npm test -- --watchAll=false --watchman=false
```

---

## How to review

1. Launch — Home is the ceremony. VS layout, countdown from **5**, scores rolling.
2. At **0** — lock flash; numbers stop.
3. Loser recedes; winner centers with gold glow.
4. **CHAMPION** letter stagger + confetti.
5. Bottom buttons and **Replay Ceremony** appear together.
6. Tap **Replay Ceremony** — sequence restarts cleanly; those buttons hide until the next finish.
7. Toggle **Light / Dark** on Home. Gold should still only sit on the winner.

---

## Project layout

```
App.tsx                          # hydrate theme/language, navigation, StatusBar
src/
  screens/Home/ui/HomeScreen.tsx # ceremony screen
  screens/Home/styles/           # Home layout (arena, top bar, resolution sheet)
  screens/Settings/              # language + appearance (also toggleable on Home)
  hooks/useCeremonySequence.ts   # timeline, shared values, interrupt-safe replay
  components/ui/
    CreatorCard.tsx
    CountdownDisplay.tsx
    ChampionTitle.tsx            # letter stagger
    CelebrationParticles.tsx     # Reanimated confetti
    ResolutionButtons.tsx
    styles/                      # matching StyleSheets
  constants/
    constantsArray.ts            # MOCK_CREATORS
    theme.ts                     # dark / light tokens (gold, confetti, etc.)
  types/creator.ts               # resolveBattleOutcome
  navigation/RootNavigator.tsx   # Home is the initial route
  store/                         # theme + language (Zustand)
docs/
  ceremony-final-dark.png        # screenshot used above
```

---

## Architecture

### Orchestration

`useCeremonySequence` owns the timeline:

**countdown + rolling scores → score lock → winner/loser reveal → gold → CHAMPION stagger → confetti → resolution UI**

Each stage `schedule()`s the next with a timeout that no-ops if the **generation id** no longer matches (replay or unmount).

Transforms, opacity, gold glow, countdown pulse, confetti, and button entrance run on the **UI thread** via Reanimated shared values (`withTiming`, `withSpring`, `withSequence`, `withDelay`). React state is only used for the countdown digit, displayed score text, particle/champion play tokens, and whether resolution chrome is mounted.

### Interrupt-safe replay

Replay:

1. Increments `generationRef`
2. Clears JS intervals/timeouts
3. `cancelAnimation` on every shared value
4. Resets values to Stage 1
5. Unmounts confetti / remounts via `ceremonyKey`
6. Hides Replay + resolution buttons until Stage 3 again

Stale callbacks from the previous run are ignored.

### Theme and gold

Home reads `useAppTheme()`. Dark tokens: background `#0A0A0A`, card `#141414`, gold `#D4A94A`. Light has a cream field and the same gold-on-winner rule.

Gold is **not** used on Watch Replay / Back to Stage. Those stay white / outlined so the champion card remains the only gold object on stage.

### Mock data

`src/constants/constantsArray.ts` — Amara K. (120) vs Marcus T. (98). Higher score wins (`resolveBattleOutcome`). Avatars are remote `pravatar` URLs.

---

## Why the sequence is timed this way

The ceremony builds suspense with the countdown and rolling scores, locks the result, then shifts hierarchy by receding the loser and centering the winner before the CHAMPION letter stagger and confetti, ending with resolution buttons so the viewer can breathe after the climax.

Resolution chrome (including **Replay Ceremony**) stays off-screen until that breath — it should not compete with the lock, the move to center, or the title.

---

## With more time

- Richer particle shapes, trails, and a haptic tick on score lock
- `prefers-reduced-motion` and fuller VoiceOver on the staged beats
- Winner passed in via props / navigation instead of hardcoded mocks
- Tablet and landscape layout
- Camera-style parallax and tighter easing on the hero spring
- Unit tests for `resolveBattleOutcome` and generation-guarded replay
- A mid-sequence Replay affordance that still stays visually quiet (spec asked for interrupt-during-motion; the current Replay chip waits until Stage 3 so the ceremony stays clean)

---

## Screen recording (30–60s)

1. Launch — VS layout, countdown **5**.
2. Countdown **0** — lock pulse on both scores.
3. Loser recedes; winner to center with gold.
4. **CHAMPION** stagger + confetti.
5. **Watch Replay** / **Back to Stage** (and **Replay Ceremony**) animate / appear.
6. Tap **Replay Ceremony** — chrome hides, sequence restarts, no stacked motion.
7. Optional: finish again and tap Replay twice quickly.
8. Optional: toggle Light/Dark on a finished frame.
