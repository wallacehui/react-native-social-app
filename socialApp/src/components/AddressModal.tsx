import * as React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Address } from "../models/address";

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  addressContainer: {
    minWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  closeIcon: {
    width: 50,
    height: 50,
  },
  addressLabel: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 10,
  },
  addressText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    paddingVertical: 10,
  },
});

interface Props {
  address: Address;
  onClose: () => void;
  visible: boolean;
}

const AddressModal = React.memo<Props>(props => {
  const { address, onClose, visible } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.backgroundContainer}>
        <View style={styles.dialogContainer}>
          <TouchableOpacity onPress={onClose}>
            <Image
              style={styles.closeIcon}
              source={require("../resources/images/close_icon.png")}
            />
          </TouchableOpacity>
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Suite</Text>
            <Text style={styles.addressText}>{address.suite}</Text>
            <Text style={styles.addressLabel}>Street</Text>
            <Text style={styles.addressText}>{address.street}</Text>
            <Text style={styles.addressLabel}>City</Text>
            <Text style={styles.addressText}>{address.city}</Text>
            <Text style={styles.addressLabel}>Zipcode</Text>
            <Text style={styles.addressText}>{address.zipcode}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default AddressModal;
