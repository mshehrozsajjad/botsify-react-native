package com.botsify.app;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import android.app.Application;
import com.onesignal.OneSignal;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import com.facebook.FacebookSdk;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
    protected static CallbackManager getCallbackManager(){
        return mCallbackManager;
    }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          
            new FBSDKPackage(mCallbackManager),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
          new ReactNativeOneSignalPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
       OneSignal.startInit(this)
        .inFocusDisplaying(OneSignal.OSInFocusDisplayOption.Notification)
        .unsubscribeWhenNotificationsAreDisabled(true)
        .init();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
