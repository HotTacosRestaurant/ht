package com.hottacos.engage;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.SafeBrowsingResponse;
import android.webkit.ServiceWorkerController;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebStorage;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.Locale;

public class MainActivity extends Activity {
    private WebView webView;
    private TextView pageLabel;
    private final Handler idleHandler = new Handler(Looper.getMainLooper());
    private boolean reloadWhenReturningToHotTacos = false;

    private final Runnable idleAction = this::endSession;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        applyImmersiveMode();
        buildUi();
        configureWebView();
        enterManagedLockTaskIfAllowed();

        if (savedInstanceState == null) {
            loadHome(false);
        } else {
            webView.restoreState(savedInstanceState);
        }
        armIdleTimer();
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.WHITE);
        root.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));

        LinearLayout toolbar = new LinearLayout(this);
        toolbar.setOrientation(LinearLayout.HORIZONTAL);
        toolbar.setGravity(Gravity.CENTER_VERTICAL);
        toolbar.setPadding(dp(14), dp(8), dp(14), dp(8));
        toolbar.setBackgroundColor(Color.rgb(18, 18, 18));
        root.addView(toolbar, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                dp(66)
        ));

        ImageView logo = new ImageView(this);
        logo.setImageResource(com.hottacos.engage.R.drawable.hot_tacos_icon);
        logo.setScaleType(ImageView.ScaleType.CENTER_CROP);
        LinearLayout.LayoutParams logoParams = new LinearLayout.LayoutParams(dp(46), dp(46));
        logoParams.setMarginEnd(dp(12));
        toolbar.addView(logo, logoParams);

        LinearLayout titleWrap = new LinearLayout(this);
        titleWrap.setOrientation(LinearLayout.VERTICAL);
        LinearLayout.LayoutParams titleWrapParams = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        toolbar.addView(titleWrap, titleWrapParams);

        TextView brand = new TextView(this);
        brand.setText("HOT TACOS");
        brand.setTextColor(Color.WHITE);
        brand.setTextSize(18);
        brand.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        titleWrap.addView(brand);

        pageLabel = new TextView(this);
        pageLabel.setText(BuildConfig.STATION_NAME + " · Engage");
        pageLabel.setTextColor(Color.rgb(255, 208, 0));
        pageLabel.setTextSize(12);
        pageLabel.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        titleWrap.addView(pageLabel);

        toolbar.addView(makeToolbarButton("← ATRÁS", this::goBackSafely));
        toolbar.addView(makeToolbarButton("⌂ INICIO", () -> loadHome(true)));
        toolbar.addView(makeToolbarButton("TERMINAR SESIÓN", this::endSession));

        webView = new WebView(this);
        webView.setBackgroundColor(Color.WHITE);
        webView.setLongClickable(false);
        webView.setHapticFeedbackEnabled(false);
        webView.setOnLongClickListener(v -> true);
        webView.setOnTouchListener((v, event) -> {
            if (event.getActionMasked() == MotionEvent.ACTION_DOWN ||
                    event.getActionMasked() == MotionEvent.ACTION_MOVE) {
                armIdleTimer();
            }
            return false;
        });
        root.addView(webView, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                0,
                1f
        ));

        setContentView(root);
    }

    private TextView makeToolbarButton(String label, Runnable action) {
        TextView button = new TextView(this);
        button.setText(label);
        button.setGravity(Gravity.CENTER);
        button.setTextColor(Color.WHITE);
        button.setTextSize(13);
        button.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        button.setPadding(dp(18), 0, dp(18), 0);
        button.setBackgroundColor(Color.rgb(35, 35, 35));
        button.setOnClickListener(v -> {
            armIdleTimer();
            action.run();
        });

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                dp(44)
        );
        params.setMarginStart(dp(8));
        button.setLayoutParams(params);
        return button;
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(false);
        settings.setSupportMultipleWindows(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setTextZoom(100);

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                // Browser builds open external actions in a new tab so Engage stays alive.
                // In this kiosk shell, capture that new-window request and load it into
                // the existing WebView; the native Hot Tacos toolbar remains visible.
                WebView popup = new WebView(MainActivity.this);
                popup.getSettings().setJavaScriptEnabled(true);
                popup.getSettings().setDomStorageEnabled(true);
                popup.setWebViewClient(new WebViewClient() {
                    private boolean handedOff = false;

                    private boolean handOff(String url) {
                        if (handedOff || url == null || url.isEmpty() || "about:blank".equals(url)) {
                            return false;
                        }

                        Uri uri = Uri.parse(url);
                        String scheme = uri.getScheme();
                        if ("http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme)) {
                            handedOff = true;
                            webView.loadUrl(url);
                            popup.post(popup::destroy);
                            return true;
                        }
                        return false;
                    }

                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                        handOff(request.getUrl().toString());
                        return true;
                    }

                    @Override
                    public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                        super.onPageStarted(view, url, favicon);
                        handOff(url);
                    }
                });

                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(popup);
                resultMsg.sendToTarget();
                return true;
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();

                // Keep every normal web page — Hot Tacos and Toast — inside this
                // same WebView. The native Hot Tacos toolbar therefore never leaves.
                if ("http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme)) {
                    return false;
                }

                // Block app/deep-link schemes on a public kiosk so the guest cannot
                // escape into another Android application.
                return true;
            }

            @Override
            public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                armIdleTimer();
                updatePageLabel(url);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                armIdleTimer();
                updatePageLabel(url);

                // If Back crossed from Toast into Hot Tacos, reload that internal
                // page once. This prevents a restored JS document from becoming a
                // visually-correct but non-interactive station.
                if (reloadWhenReturningToHotTacos && isHotTacosUrl(url)) {
                    reloadWhenReturningToHotTacos = false;
                    view.reload();
                }
            }
        });
    }

    private void goBackSafely() {
        String current = webView.getUrl();
        if (current == null) {
            loadHome(false);
            return;
        }

        if (isHomeUrl(current)) {
            return;
        }

        if (!isHotTacosUrl(current)) {
            reloadWhenReturningToHotTacos = true;
        }

        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            loadHome(false);
        }
    }

    private void loadHome(boolean clearGuestSession) {
        reloadWhenReturningToHotTacos = false;
        webView.stopLoading();

        if (clearGuestSession) {
            clearGuestData(() -> {
                webView.clearHistory();
                webView.loadUrl(BuildConfig.HOME_URL);
            });
        } else {
            webView.clearHistory();
            webView.loadUrl(BuildConfig.HOME_URL);
        }
        armIdleTimer();
    }

    private void endSession() {
        clearGuestData(() -> {
            reloadWhenReturningToHotTacos = false;
            webView.stopLoading();
            webView.clearHistory();
            webView.loadUrl(BuildConfig.HOME_URL);
            armIdleTimer();
        });
    }

    private void clearGuestData(Runnable after) {
        try {
            webView.evaluateJavascript(
                    "try{localStorage.clear();sessionStorage.clear();}catch(e){}", null
            );
        } catch (Exception ignored) {}

        WebStorage.getInstance().deleteAllData();
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.removeSessionCookies(value ->
                cookieManager.removeAllCookies(value2 -> {
                    cookieManager.flush();
                    runOnUiThread(after);
                })
        );
    }

    private void updatePageLabel(String url) {
        if (url == null) {
            pageLabel.setText(BuildConfig.STATION_NAME + " · Engage");
            return;
        }

        Uri uri = Uri.parse(url);
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase(Locale.CANADA);
        if (host.contains("toasttab.com")) {
            pageLabel.setText(BuildConfig.STATION_NAME + " · Toast");
        } else if (isHotTacosUrl(url)) {
            pageLabel.setText(BuildConfig.STATION_NAME + " · Hot Tacos");
        } else {
            pageLabel.setText(BuildConfig.STATION_NAME + " · Secure session");
        }
    }

    private boolean isHomeUrl(String url) {
        if (url == null) return false;
        String normalized = url.replaceAll("/+$", "");
        String home = BuildConfig.HOME_URL.replaceAll("/+$", "");
        return normalized.equalsIgnoreCase(home);
    }

    private boolean isHotTacosUrl(String url) {
        if (url == null) return false;
        try {
            Uri uri = Uri.parse(url);
            String host = uri.getHost();
            if (host == null) return false;
            host = host.toLowerCase(Locale.CANADA);
            return host.equals("hottacosrestaurant.com") || host.endsWith(".hottacosrestaurant.com");
        } catch (Exception ignored) {
            return false;
        }
    }

    private void armIdleTimer() {
        idleHandler.removeCallbacks(idleAction);
        idleHandler.postDelayed(idleAction, BuildConfig.SESSION_IDLE_MS);
    }

    private void enterManagedLockTaskIfAllowed() {
        try {
            DevicePolicyManager dpm = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
            if (dpm != null && dpm.isLockTaskPermitted(getPackageName())) {
                startLockTask();
            }
        } catch (Exception ignored) {}
    }

    private void applyImmersiveMode() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        );
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @Override
    protected void onResume() {
        super.onResume();
        applyImmersiveMode();
        armIdleTimer();
    }

    @Override
    protected void onPause() {
        super.onPause();
        idleHandler.removeCallbacks(idleAction);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            goBackSafely();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        idleHandler.removeCallbacks(idleAction);
        if (webView != null) {
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
