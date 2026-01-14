import { Text, View } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { styles } from "./styles";

export default function NotFoundScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>404 - Not Found</Text>
      <Text style={styles.subtitle}>The page you are looking for does not exist.</Text>
    </View>
  );
}

