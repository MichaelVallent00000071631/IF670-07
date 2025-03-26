import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from "react-native-reanimated";

const contacts = [
  { id: "1", name: "User 1", image: "https://randomuser.me/api/portraits/lego/0.jpg" },
  { id: "2", name: "User 2", image: "https://randomuser.me/api/portraits/lego/1.jpg" },
  { id: "3", name: "User 3", image: "https://randomuser.me/api/portraits/lego/2.jpg" },
  { id: "4", name: "User 4", image: "https://randomuser.me/api/portraits/lego/3.jpg" },
  { id: "5", name: "User 5", image: "https://randomuser.me/api/portraits/lego/4.jpg" },
  { id: "6", name: "User 6", image: "https://randomuser.me/api/portraits/lego/5.jpg" },
  { id: "7", name: "User 7", image: "https://randomuser.me/api/portraits/lego/6.jpg" },
  { id: "8", name: "User 8", image: "https://randomuser.me/api/portraits/lego/7.jpg" },
  { id: "9", name: "User 9", image: "https://randomuser.me/api/portraits/lego/8.jpg" },
];

const AnimatedCard = ({ item, index }) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withDelay(index * 100, withSpring(0));
    opacity.value = withDelay(index * 100, withSpring(1));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Animated.View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <AnimatedCard item={item} index={index} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#808080",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
