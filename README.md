# Stage Feed — Developer Hub Test Task

Single-screen vertical performance feed (TikTok / Reels-style) built in the existing React Native CLI project.

## Setup

### Prerequisites

- Node.js `>= 22.11.0`
- [React Native environment](https://reactnative.dev/docs/set-up-your-environment) (Xcode / Android Studio, CocoaPods, JDK)

### Installation

```sh
npm install
```

iOS pods (first clone, or after native dependency changes such as `react-native-video`, `react-native-localize`, or `react-native-keychain`):

```sh
bundle install
bundle exec pod install --project-directory=ios
```

### Run

```sh
npm start
```

In a second terminal:

```sh
npm run ios
# or
npm run android
```

The app opens on the Stage Feed (Home) screen.

## Technical Decisions

**Feed / list.** A vertical `FlatList` is used instead of `ScrollView` so only nearby full-screen items stay mounted. Each item’s height matches the measured list viewport; `getItemLayout`, `pagingEnabled`, and `snapToInterval` keep swipes snapping one performance at a time. `initialNumToRender={1}` and `windowSize={3}` keep video work bounded.

**State.** Follow and applause live in the screen as records keyed by performance id. That survives list recycling (item-local state would reset when rows unmount) and keeps updates immutable. `React.memo` on the feed item skips re-rendering rows whose follow/applause props did not change. App-wide language and the shared clock live in Zustand (`src/store`), not React context.

**Battle countdown.** A single `setInterval` in `useCurrentTimeStore` ticks once per second. Only `BattleChip` subscribes to `now`, so items without a battle do not re-render from the clock. Missing or invalid `battleStartsAt` values render nothing; past timestamps show **Battle Live** in red; future timestamps show `Battle in …` and flip to live when the time elapses. The interval is cleared when the app unmounts.

**Language.** `i18next` + `react-i18next` load 25 locales from `src/languageConfig`. The device language is detected with `react-native-localize` (React Native CLI, not Expo). The chosen language is persisted in the OS keychain via `react-native-keychain` and applied from `useLanguageStore`. Layout uses `start`/`end` and Yoga `direction`, so English and other LTR languages stay left-to-right, while Arabic and Urdu flip to RTL immediately. Settings can be dismissed with a left-to-right back swipe (`slide_from_right`).

**Animation.** Applause uses React Native `Animated` with the native driver (scale burst + spring). Rapid taps stop the in-flight animation and restart it; the count is not driven by animation state.

**Media.** Each performance uses a remote MP4 via `react-native-video`, full-bleed with `resizeMode="cover"` and looping. Only the currently visible item plays (and unmutes); off-screen players stay paused so scrolling stays light. This is local autoplay, not a live streaming pipeline.

## With More Time

- Prefetch / cache the next clip
- Adaptive bitrate / HLS
- Backend feed + persistent follow / applause
- Accessibility pass (reduced motion, larger hit targets, screen reader order)
- Broader unit coverage and E2E swipe tests
