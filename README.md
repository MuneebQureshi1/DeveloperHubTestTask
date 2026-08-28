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

iOS pods (first clone, or after native dependency changes such as `react-native-video`):

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

**State.** Follow and applause live in the screen as records keyed by performance id. That survives list recycling (item-local state would reset when rows unmount) and keeps updates immutable. `React.memo` on the feed item skips re-rendering rows whose follow/applause props did not change. No global store — the task does not need one.

**Battle countdown.** A single `setInterval` in `CurrentTimeProvider` ticks once per second. Only `BattleChip` reads that context, so items without a battle do not subscribe. Missing or invalid `battleStartsAt` values render nothing; past timestamps show **Battle Live** in red; future timestamps show `Battle in …` and flip to live when the time elapses. The interval is cleared on unmount.

**Animation.** Applause uses React Native `Animated` with the native driver (scale burst + spring). Rapid taps stop the in-flight animation and restart it; the count is not driven by animation state.

**Media.** Each performance uses a remote MP4 via `react-native-video`, full-bleed with `resizeMode="cover"` and looping. Only the currently visible item plays (and unmutes); off-screen players stay paused so scrolling stays light. This is local autoplay, not a live streaming pipeline.

## With More Time

- Prefetch / cache the next clip
- Adaptive bitrate / HLS
- Backend feed + persistent follow / applause
- Accessibility pass (reduced motion, larger hit targets, screen reader order)
- Broader unit coverage and E2E swipe tests
