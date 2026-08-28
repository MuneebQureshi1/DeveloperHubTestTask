# Developer Hub Test Task

React Native CLI project (not Expo). Work for this pass lives on the `Test_Task_2` branch.

The app keeps language, appearance, navigation, and Settings. The Stage Feed from the first task is not part of this branch.

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

Run this the first time you clone, and again after native dependency changes (`react-native-localize` or `react-native-keychain`):

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

The app opens on Home. The first launch can take several minutes while Xcode builds.

To target a specific simulator:

```sh
npx react-native run-ios --simulator="iPhone 16"
```

### Step 6. Run on Android

Start an emulator from Android Studio (Device Manager), then in a second terminal:

```sh
npm run android
```

The app opens on Home.

### Step 7. Run unit tests (optional)

```sh
npm test -- --watchAll=false --watchman=false
```

## What you should see

1. Home is an empty screen with a Language control.
2. Open Settings from that control to change language or appearance.

## Project layout

`App.tsx` hydrates language and theme, and mounts navigation.

`src/navigation/RootNavigator.tsx` is a native stack. Home is the initial route. Settings is optional.

`src/screens/Home/ui/HomeScreen.tsx` is the landing screen.

`src/screens/Settings/ui/SettingsScreen.tsx` changes language and light/dark appearance.

`src/store/useLanguageStore.ts` and `src/store/useThemeStore.ts` persist language and appearance in the OS keychain.
