// components/earnings/EarningsPanel.tsx
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Payout = {
  id: string;
  amount: number;
  date: string; // display string
  status?: "paid" | "processing" | "failed";
  note?: string;
};

/**
 * Dummy data inside the component file (frontend-only)
 * — change these values here while developing, later replace with API call inside component if needed.
 */
const TOTAL_EARNINGS = 12450.5;
const DUMMY_PAYOUTS: Payout[] = [
  { id: "p1", amount: 3500.0, date: "2025-10-01", status: "paid", note: "Payout - Oct 1" },
  { id: "p2", amount: 2900.0, date: "2025-09-01", status: "paid", note: "Payout - Sep 1" },
];

const formatRupee = (val: number) => {
  const parts = Math.abs(val).toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (val < 0 ? "-" : "") + "₹" + parts.join(".");
};

const EarningsPanel: React.FC = () => {
  const payouts = DUMMY_PAYOUTS;
  const totalEarnings = TOTAL_EARNINGS;

  const renderPayout = ({ item }: { item: Payout }) => (
    <TouchableOpacity style={styles.payoutRow} activeOpacity={0.8}>
      <View style={styles.payoutLeft}>
        <Text style={styles.payoutAmount}>{formatRupee(item.amount)}</Text>
        <Text style={styles.payoutNote}>{item.note ?? item.date}</Text>
      </View>
      <View style={styles.payoutRight}>
        <Text style={[styles.payoutStatus, item.status === "paid" ? styles.paid : styles.processing]}>
          {item.status ?? "paid"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>

      <View style={styles.totalCardWrap}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Earnings (This Month)</Text>
          <Text style={styles.totalAmount}>{formatRupee(totalEarnings)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Payout History</Text>
      <Text style={styles.sectionSubtitle}>A record of all payouts sent to your bank account.</Text>

      <View style={styles.historyWrap}>
        {payouts.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No payouts yet</Text>
          </View>
        ) : (
          <FlatList
            data={payouts}
            keyExtractor={(i) => i.id}
            renderItem={renderPayout}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentContainerStyle={{ padding: 12 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#111",
  },
  totalCardWrap: {
    alignItems: "center",
    marginBottom: 18,
  },
  totalCard: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    alignItems: "center",
  },
  totalLabel: {
    color: "#AAA",
    fontSize: 13,
    marginBottom: 10,
  },
  totalAmount: {
    color: "#2E8B32",
    fontSize: 28,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#9B9B9B",
    marginBottom: 12,
  },
  historyWrap: {
    minHeight: 120,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  emptyBox: {
    height: 120,
    borderRadius: 8,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    color: "#BDBDBD",
    fontSize: 15,
  },
  payoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F4F4F4",
  },
  payoutLeft: {},
  payoutAmount: { fontSize: 16, fontWeight: "700", color: "#111" },
  payoutNote: { color: "#8F8F8F", fontSize: 13, marginTop: 6 },
  payoutRight: {
    alignItems: "flex-end",
  },
  payoutStatus: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  paid: { color: "#2E8B32" },
  processing: { color: "#D89A3C" },
});

export default EarningsPanel;