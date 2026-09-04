# Hot Tacos Engage — Android Kiosk Shell

This is the native Android shell for the 21–22 inch FreshKDS-style Android touch displays.
It intentionally keeps a native Hot Tacos toolbar above every web page, including Toast.
The guest therefore never depends on the browser Back button and cannot lose the Engage home screen.

## What it does

- Runs in landscape/full-screen/immersive mode.
- Loads the existing Hot Tacos `/engage/...` web app.
- Keeps **Back**, **Home**, and **End Session** controls outside the webpage.
- Opens Toast Gift Cards, Rewards, and Online Ordering inside the same native WebView.
- Blocks non-HTTP deep links so guests cannot escape into unrelated Android apps.
- Ends the guest session after 3 minutes of inactivity.
- On Home/End Session, clears cookies, Web Storage, browser history, and returns to Engage.
- If Android/MDM has whitelisted the package for Lock Task, the app automatically enters managed kiosk mode.
- Includes separate Windsor and Leamington product flavors.

## Build variants

Windsor:

```bash
./gradlew assembleWindsorDebug
./gradlew assembleWindsorRelease
```

Leamington:

```bash
./gradlew assembleLeamingtonDebug
./gradlew assembleLeamingtonRelease
```

Production URLs are defined in `app/build.gradle`:

- `https://hottacosrestaurant.com/engage/windsor`
- `https://hottacosrestaurant.com/engage/leamington`

## Android Studio

Open the `android-kiosk` folder directly as an Android Studio project, let Gradle sync, then select either:

- `windsorDebug`
- `leamingtonDebug`

and run it on the Android display.

## Real kiosk lockdown

The app hides system bars itself. For a true unattended kiosk, deploy it through the MDM as a permitted Lock Task package. When Android reports that this package is allowed for Lock Task, `MainActivity` calls `startLockTask()` automatically.

## Session timeout

Currently 180 seconds. Change this in `app/build.gradle`:

```gradle
buildConfigField 'long', 'SESSION_IDLE_MS', '180000L'
```
