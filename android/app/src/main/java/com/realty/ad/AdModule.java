package com.realty.ad;

import android.support.annotation.Nullable;
import android.view.View.OnLayoutChangeListener;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

import com.realty.android.gms.ads.AdListener;
import com.realty.android.gms.ads.AdRequest;
import com.realty.android.gms.ads.AdSize;
import com.realty.android.gms.ads.AdView;

import java.util.Map;

public class RealtyAdBannerViewManager extends SimpleViewManager<ReactViewGroup> {
    
}