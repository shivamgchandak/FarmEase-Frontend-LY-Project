import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

type Category = { id: string; name: string };
type Unit = { id: string; label: string };

const DUMMY_CATEGORIES: Category[] = [
  { id: "veg", name: "Vegetables" },
  { id: "fru", name: "Fruits" },
  { id: "dairy", name: "Dairy" },
  { id: "grain", name: "Grains" },
];

const DUMMY_UNITS: Unit[] = [
  { id: "kg", label: "kg" },
  { id: "g", label: "g" },
  { id: "pc", label: "pc" },
  { id: "ltr", label: "ltr" },
];

export default function AddProductScreen() {
  // Product Identity
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  // Description
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");

  // Pricing & Stock
  const [price, setPrice] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<Unit | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [quantityUnit, setQuantityUnit] = useState<Unit | null>(null);

  // Pickers
  const [catOpen, setCatOpen] = useState(false);
  const [priceUnitOpen, setPriceUnitOpen] = useState(false);
  const [qtyUnitOpen, setQtyUnitOpen] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Permission to access media library is required.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        // expo-image-picker v14+ returns assets array
        const uri = Array.isArray(result.assets) ? result.assets[0].uri : (result as any).uri;
        setImageUri(uri);
      }
    } catch (err) {
      console.warn("Image pick error", err);
    }
  };

  const handleSubmit = () => {
    // Simple front-end validation
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter product name.");
      return;
    }
    if (!category) {
      Alert.alert("Validation", "Please select a category.");
      return;
    }
    // Build payload
    const payload = {
      name,
      category: category.name,
      description,
      expiry,
      price,
      priceUnit: priceUnit?.label ?? null,
      quantity,
      quantityUnit: quantityUnit?.label ?? null,
      imageUri,
    };
    console.log("Listing product payload:", payload);
    // TODO: call API here
    Alert.alert("Success", "Product payload logged to console.");
    // Optionally go back:
    router.back();
  };

  const renderPickerModal = <T extends { id: string; name?: string; label?: string }>(
    visible: boolean,
    data: T[],
    onSelect: (item: T) => void,
    onClose: () => void,
    title = "Select"
  ) => (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={data}
            keyExtractor={(d) => d.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalRow}
                onPress={() => {
                  onSelect(item);
                }}
              >
                <Text style={styles.modalRowText}>{(item as any).name ?? (item as any).label}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#F0F0F0" }} />}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Product Identity */}
          <Text style={styles.sectionTitle}>Product Identity</Text>

          <View style={styles.avatarWrap}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
          </View>

          <TouchableOpacity style={styles.uploadButton} onPress={pickImage} activeOpacity={0.8}>
            <Text style={styles.uploadText}>Upload Picture</Text>
            <Text style={styles.uploadIcon}>⤴︎</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Enter Product Name"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity style={styles.select} onPress={() => setCatOpen(true)} activeOpacity={0.8}>
            <Text style={[styles.selectText, !category && styles.selectPlaceholder]}>
              {category?.name ?? "Select Product Category"}
            </Text>
            <Text style={styles.selectChevron}>▾</Text>
          </TouchableOpacity>

          {/* Description */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Product Description</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Description (e.g., Grown with organic methods, juicy and perfect for salads...)"
            placeholderTextColor="#CFCFCF"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <TextInput
            style={styles.input}
            placeholder="How many days/hrs until it expires?"
            placeholderTextColor="#BDBDBD"
            value={expiry}
            onChangeText={setExpiry}
          />

          {/* Pricing & Stock */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pricing & Stock</Text>

          <Text style={styles.smallLabel}>Price</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.inputSmall]}
              placeholder="₹"
              placeholderTextColor="#BDBDBD"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TouchableOpacity style={[styles.inputSmall, styles.unitSelect]} onPress={() => setPriceUnitOpen(true)}>
              <Text style={[styles.selectText, !priceUnit && styles.selectPlaceholder]}>
                {priceUnit?.label ?? "Select Unit"}
              </Text>
              <Text style={styles.selectChevron}>▾</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.smallLabel, { marginTop: 10 }]}>Available Quantity</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.inputSmall]}
              placeholder="0"
              placeholderTextColor="#BDBDBD"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <TouchableOpacity style={[styles.inputSmall, styles.unitSelect]} onPress={() => setQtyUnitOpen(true)}>
              <Text style={[styles.selectText, !quantityUnit && styles.selectPlaceholder]}>
                {quantityUnit?.label ?? "Select Unit"}
              </Text>
              <Text style={styles.selectChevron}>▾</Text>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={handleSubmit}>
            <Text style={styles.ctaText}>List Product on Marketplace</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Pickers */}
      {renderPickerModal(
        catOpen,
        DUMMY_CATEGORIES,
        (c) => {
          setCategory(c as Category);
          setCatOpen(false);
        },
        () => setCatOpen(false),
        "Select Category"
      )}

      {renderPickerModal(
        priceUnitOpen,
        DUMMY_UNITS,
        (u) => {
          setPriceUnit(u as Unit);
          setPriceUnitOpen(false);
        },
        () => setPriceUnitOpen(false),
        "Select Unit"
      )}

      {renderPickerModal(
        qtyUnitOpen,
        DUMMY_UNITS,
        (u) => {
          setQuantityUnit(u as Unit);
          setQtyUnitOpen(false);
        },
        () => setQtyUnitOpen(false),
        "Select Unit"
      )}
    </View>
  );
}

const AVATAR_SIZE = 140;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE - 16,
    height: AVATAR_SIZE - 16,
    borderRadius: (AVATAR_SIZE - 16) / 2,
    backgroundColor: "#fff",
    borderColor: "#F0F0F0",
    borderWidth: 1,
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    resizeMode: "cover",
  },
  uploadButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#3CA541",
    borderWidth: 1.6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 8,
    gap: 10,
  },
  uploadText: { color: "#3CA541", fontSize: 16, fontWeight: "600" },
  uploadIcon: { color: "#3CA541", fontSize: 18, marginLeft: 8 },
  input: {
    width: "100%",
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222",
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  select: {
    width: "100%",
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: { fontSize: 16, color: "#222" },
  selectPlaceholder: { color: "#BDBDBD" },
  selectChevron: { fontSize: 18, color: "#BDBDBD" },
  smallLabel: { color: "#888", fontSize: 13, marginTop: 10, marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  inputSmall: {
    flex: 1,
    marginTop: 6,
    borderRadius: 8,
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  unitSelect: { flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cta: {
    marginTop: 22,
    backgroundColor: "#3CA541",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", paddingHorizontal: 8, paddingVertical: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: "45%" },
  modalTitle: { fontSize: 16, fontWeight: "600", paddingVertical: 8, paddingHorizontal: 12 },
  modalRow: { paddingVertical: 14, paddingHorizontal: 12 },
  modalRowText: { fontSize: 16, color: "#333" },
});