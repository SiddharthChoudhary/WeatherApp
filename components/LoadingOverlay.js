'use strict';

var React = require('react-native');
var PropTypes = require('prop-types');
var Overlay = require('react-native-overlay');
import createReactClass from 'create-react-class'

var {
  View,
  ActivityIndicatorIOS,
  StyleSheet,
} = React;

type Props = {
  isVisible: boolean;
}

var LoadingOverlay = createReactClass({
  getDefaultProps(): Props {
    return {
      isVisible: false
    }
  },

  render(): ReactElement {
    return (
      <Overlay isVisible={this.props.isVisible}>
        <View style={styles.background}>
          <ActivityIndicatorIOS
            size="large"
            animating={true}
            style={styles.spinner} />
        </View>
      </Overlay>
    );
  }
});

var styles = StyleSheet.create({
  background: {
    backgroundColor: "#3d566e",
    flex: 1,
    justifyContent: 'center',
  },
})

module.exports = LoadingOverlay;
