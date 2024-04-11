import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { signInWithPhoneNumber } from "@firebase/auth";
import { auth, app } from "./firebase/firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export default function App() {
  const recaptchaVerifier = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store phone number input
  const [verificationCode, setVerificationCode] = useState(""); // State to store OTP input

  const loginWithPhoneNumber = async () => {
    try {
      const formattedPhoneNumber = `+855${phoneNumber}`; // Add +855 prefix to the entered phone number
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
      setConfirmationResult(confirmation);
      console.log("[DEBUG] Verification code sent to", phoneNumber);
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  const verifyCode = async () => {
    try {
      if (confirmationResult) {
        const userCredential = await confirmationResult.confirm(verificationCode);
        setUserPhoneNumber(userCredential.user.phoneNumber);
        console.log("Phone number verified:", userCredential.user.phoneNumber);
      } else {
        console.error("No confirmation result available.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello my Friend 🔥</Text>
      {userPhoneNumber ? (
        <Text>YOUR PHONE NUMBER IS: {userPhoneNumber}</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity onPress={loginWithPhoneNumber} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={verifyCode} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    width: "100%"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
  }
});
