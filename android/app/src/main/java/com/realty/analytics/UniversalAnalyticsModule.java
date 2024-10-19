package com.realty.analytics;

import android.content.Context;
import android.os.Bundle;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;

// Replace with xnet libs
import com.google.firebase.analytics.FirebaseAnalytics;
import io.invertase.firebase.common.UniversalFirebaseModule;

import java.util.Set;

@SuppressWarnings("WeakerAccess")
public class UniversalAnalyticsModule extends UniversalFirebaseModule {
    UniversalAnalyticsModule(Context context, String serviceName) {
        super(context, serviceName);
    }

    Task<void> logEvent(String name, Bundle params) {
        return Tasks.call(
            () -> {
                FirebaseAnalytics.getInstance(getContext()).logEvent(name, params);
                return null;
            }
        );
    }
}