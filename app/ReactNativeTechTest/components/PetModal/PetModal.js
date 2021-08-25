import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import pluralize from "pluralize";

const PetModal = ({isVisible, onHide, pet, onDelete}) => {
  if (!isVisible) return null;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.iconContainer} />
            <Text style={[styles.modalText, styles.modalTitleText]}>{pet.name}</Text>
            <Text style={styles.modalText}>{pet.type}</Text>
            <Text style={styles.modalText}>Needs feeding {pluralize('times', pet.feeds, true)} a day!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onHide}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={onDelete}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  iconContainer: {
    marginTop: -80,
    marginBottom: 24,
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: 'grey',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 4,
  },
  buttonDelete: {
    backgroundColor: "#96281b",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTitleText: {
    fontWeight: "bold"
  }
});


export default PetModal;
