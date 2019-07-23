import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropType from 'prop-types';
import { WebView } from 'react-native-webview';

export default class Repository extends Component {
  static propTypes = {
    navigation: PropType.shape({
      getParam: PropType.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  state = {
    docs: [],
    load: true,
  };

  componentDidMount() {
    this.handleTest();
  }

  handleTest = load => {
    const { navigation } = this.props;
    const response = navigation.getParam('repository');
    this.setState({
      docs: response,
      load,
    });
  };

  handleLoad = () => {
    const load = false;

    this.handleTest(load);
  };

  render() {
    const { docs, load } = this.state;
    return (
      <>
        {load ? (
          <ActivityIndicator color="#7519c1" />
        ) : (
          <WebView
            source={{ uri: docs.html_url }}
            onLoadStart={this.handleLoad}
          />
        )}
      </>
    );
  }
}
