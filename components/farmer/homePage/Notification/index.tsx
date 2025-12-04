// components/NotificationCard.tsx
import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import GreenRing from "../../../../assets/images/GreenRing.png";
import RedRing from "../../../../assets/images/RedRing.png";

type NotificationType = "success" | "warning";

export type NotificationItem = {
  id: string;
  title: string;
  subtitle?: string;
  type?: NotificationType;
};

type NotificationCardProps = {
  // If provided, the component will use this data instead of the internal dummy data.
  initial?: NotificationItem[] | null;
  // Optional callback when a notification is dismissed (still removal is frontend-only).
  onDismiss?: (id: string) => void;
};

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Dummy data stored in this file only (frontend).
 * Add or modify items here while you develop the UI.
 */
const DUMMY_ITEMS: NotificationItem[] = [
  {
    id: "fme-10925003",
    title: "New order #FME10925003",
    subtitle: "Order received from Mumbai",
    type: "success",
  },
  // Add more items if you want to test a stack:
  {
    id: "low-stock-1",
    title: "Heads up! Your 'Fresh Tomatoes'",
    subtitle: "listing has only 5kg left in stock.",
    type: "warning",
  },
];

const NotificationCard: React.FC<NotificationCardProps> = ({ initial = null, onDismiss }) => {
  // Use the provided initial array if passed, otherwise use the file-local DUMMY_ITEMS.
  const [items, setItems] = useState<NotificationItem[]>(initial ?? DUMMY_ITEMS);

  // Keep state synced if parent passes a new initial prop
  useEffect(() => {
    if (initial) setItems(initial);
  }, [initial]);

  const handleDismiss = (id: string) => (_e?: GestureResponderEvent) => {
    // Animate and remove only on the frontend
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (onDismiss) onDismiss(id);
  };

  if (!items || items.length === 0) return null;

  // Render the first item only (matches your single-card screenshot).
  const item = items[0];
  const isSuccess = item.type === "success";

  return (
    <View style={styles.wrapper}>
      <View style={[styles.card, isSuccess ? styles.cardSuccess : styles.cardWarning]}>
        <View style={styles.left}>
          <View>
            <Image
              source={isSuccess ? GreenRing : RedRing}
              style={styles.bellImage}
            />
          </View>
        </View>

        <View style={styles.center}>
          <Text style={[styles.title, isSuccess ? styles.titleSuccess : styles.titleWarning]} numberOfLines={2}>
            {item.title}
          </Text>
          {item.subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {item.subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            onPress={handleDismiss(item.id)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="dismiss"
          >
            <Text style={[styles.cross, isSuccess ? styles.crossSuccess : styles.crossWarning]}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    minHeight: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  cardSuccess: {
    backgroundColor: "#EAF8ED", // pale green
  },
  cardWarning: {
    backgroundColor: "#F6E3E1", // pale pink
  },
  left: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bellImage: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  center: {

  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  titleSuccess: {
    color: "#2E8B32",
  },
  titleWarning: {
    color: "#D8634E",
  },
  subtitle: {
    color: "#6B6B6B",
    fontSize: 12,
    fontWeight: "400", 
  },
  right: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  cross: {
    fontSize: 24,
    fontWeight: "600",
  },
  crossSuccess: {
    color: "#2E8B32",
  },
  crossWarning: {
    color: "#D8634E",
  },
});

export default NotificationCard;