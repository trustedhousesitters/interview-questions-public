import { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "./styles";
import { LoggedInContext } from "@/App";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, toggleIsLoggedIn } = useContext(LoggedInContext);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isLoggedIn ? styles.logoutButton : styles.loginButton,
        ]}
        onPress={toggleIsLoggedIn}
      >
        <Text style={styles.buttonText}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </Text>
      </Pressable>
    </View>
  );
}
