import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { InterstitialAd, TestIds, BannerAd, BannerAdSize, RewardedAd, AdEventType, RewardedAdEventType } from '@react-native-firebase/admob';

const widthConst = Dimensions.get('screen').width;

export default class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    showInterstitialAd = () => {
        // create a new add instance
        const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
        // Add event handlers
        interstitialAd.onAdEvent((type, error) => {
            if (type === AdEventType.LOADED) {
                interstitialAd.show();
            }
        });
        interstitialAd.load();
    }

    showRewardAd = () => {
        const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
        rewardAd.onAdEvent((type, error) => {
            if (type === RewardedAdEventType.LOADED) {
                rewardAd.show();
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of 5 lives');
                Alert.alert('Reward Ad', 'You just earned a reward of 5 lives', [
                    {text: 'OK', onPress: () => console.log('OK PRESSED')},
                ], {'cancelable': true});
            }
        });

        rewardAd.load();
    }

    render() {
        return (
            <View>
                <View style={styles.bannerAdWrapper}>
                    <BannerAd unitId={TestIds.BANNER}
                        size={BannerAdSize.SMART_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                        onAdLoaded={() => {
                            console.log('Advert loaded');
                        }}
                        onAdFailedToLoad={(error) => {
                            console.error('Advert failed to load', error);
                        }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bannerAdWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: widthConst
    }
})