import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ showSidebar, sidebarAnimation, toggleSidebar }) => {
  const sidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-7, 0],
  });

  return (
    showSidebar && (
      <Animated.View
        style={[
          sidebarStyles.container,
          {
            transform: [{ translateX: sidebarTranslateX }],
          },
        ]}
      >
        <TouchableOpacity style={sidebarStyles.closeButton} onPress={toggleSidebar}>
          <FontAwesomeIcon icon={faXmark} />
        </TouchableOpacity>
        {/* Add your sidebar content here */}
        <TouchableOpacity style={sidebarStyles.powerOff}>
          <FontAwesomeIcon icon={faPowerOff} />
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const sidebarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    elevation: 5,
    width: '80%',
    height: '100%',
    padding: 20,
    overflow: 'visible',
  },
  closeButton: {
    width: 50,
    alignSelf: 'flex-end',
    padding: 10,
  },
  powerOff: {
    position: 'relative',
    top: -26,
    width: 60,
  },
});

export default Sidebar;
