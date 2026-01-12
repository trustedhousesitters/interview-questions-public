import { Text, View, StyleSheet } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function LoginRequiredScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Login Required</Text>
      <Text style={styles.subtitle}>Please log in to view this listing.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#d32f2f',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
});
