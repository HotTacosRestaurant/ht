# Engage navigation fix

## Browser behavior (Windows, macOS, iPhone/iPad, Android browser)
External Toast actions (Gift Cards, Rewards, Online Ordering) open in a separate browser tab/window with `target="_blank"` and `rel="noopener noreferrer"`. The Engage document remains loaded and interactive. No browser Back navigation is required.

## Android kiosk shell behavior
The kiosk shell enables multiple-window handling in WebView and intercepts `target="_blank"` requests. Instead of launching another Android browser, it loads the requested HTTP/HTTPS URL in the shell's existing WebView. The native Hot Tacos toolbar remains visible, so Home/Back/End Session remain under kiosk control.

## Removed
The previous `pageshow`, `back_forward`, sessionStorage return marker, and hard-reload return guard were removed from the WebApp. They are no longer needed and were a source of fragile browser behavior.
