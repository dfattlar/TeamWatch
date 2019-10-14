import React, {useState, useEffect} from 'react';
import {View, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import Time from './Time';
import HighlightedTime from './HighlightedTime';

const TimerComponent = ({showHighlight, startTime}) => {
  const [vis, setVis] = useState(showHighlight);
  const animatedValue = new Animated.Value(
    showHighlight ? 0 : !startTime ? 1 : 0,
  );
  const marginBottom = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0],
  });
  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  useEffect(() => {
    animate();
  }, [showHighlight]);

  return (
    <View>
      <Animated.View
        style={{
          marginBottom,
        }}>
        <Time />
      </Animated.View>
      <Animated.View
        style={{
          opacity,
          height: 40,
          marginBottom: 15,
        }}>
        <HighlightedTime />
      </Animated.View>
    </View>
  );
  function animate() {
    Animated.timing(animatedValue, {
      toValue: showHighlight ? 1 : 0,
      duration: 500,
      easing: Easing.linear,
    }).start(() => {
      setVis(showHighlight);
    });
  }
};

TimerComponent.propTypes = {
  time: PropTypes.number,
};

export default TimerComponent;
