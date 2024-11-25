"use client";
import { StyleSheet, Text, View } from "react-native";

export default function ImagesWrapper() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 50,
          fontWeight: "bold",
        }}
      >
        Hello
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
  },
});
