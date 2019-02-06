import React, { Component } from 'react';
import Index from './src/index';
import { Provider } from 'react-redux';
import configureStore from './src/store/store';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingComplete: false
        };
    }

    render() {
      if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        );
      } else {
          console.log('store')
        return (
            <Provider store={configureStore()}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <Index />
                </View>
            </Provider>
        );
      }
    }

    _loadResourcesAsync = async () => {
      return Promise.all([
        Asset.loadAsync([
          require('./src/assets/images/robot-dev.png'),
          require('./src/assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
          // This is the font that we are using for our tab bar
          ...Icon.Ionicons.font,
          // We include SpaceMono because we use it in Home.js free
          // to remove this if you are not using it in your app
          'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
        }),
      ]);
    };

    _handleLoadingError = error => {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(error);
    };

    _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});