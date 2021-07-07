import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import { WebView } from "react-native-webview";

const WEBVIEW_URL = 'https://www.sapium.com.br/';
// const WEBVIEW_URL = "http://192.168.0.153:8002";

export default function App() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const webviewRef = useRef(null);

  console.log(canGoBack, canGoForward, currentUrl);

  const onAndroidBackPress = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          onMessage={(event) => console.log(event.nativeEvent)}
          userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
          ref={webviewRef}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
            setCurrentUrl(navState.url);
          }}
          source={{ uri: WEBVIEW_URL }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});
