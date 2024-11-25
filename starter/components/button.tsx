import { Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export default function Button({
  onClick,
  children,
  style,
}: {
  onClick: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onClick}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
