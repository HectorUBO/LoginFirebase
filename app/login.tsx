import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import { TextInput, View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const success = await login(email, password);
        if (success) {
            router.replace("/home");
        } else {
            Alert.alert("ACCESS DENIED", "Invalid credentials. Try again, vault dweller.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Pip-Boy Header */}
            <View style={styles.pipboyHeader}>
                <Text style={styles.pipboyBrand}>VAULT-TEC</Text>
                <Text style={styles.pipboyModel}>PIP-BOY 3000 MK IV</Text>
                <Text style={styles.screenSubtitle}>SECURITY TERMINAL</Text>
            </View>

            <View style={styles.screenBorder}>
                <View style={styles.screen}>
                    <Text style={styles.title}>VAULT SECURITY PROTOCOL</Text>
                    <Text style={styles.subtitle}>AUTHENTICATION REQUIRED</Text>

                    <Text style={styles.label}>VAULT ID (EMAIL):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENTER VAULT-TEC EMAIL"
                        placeholderTextColor="#14fe17"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>ACCESS CODE:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENTER SECURITY CODE"
                        placeholderTextColor="#14fe17"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.loginButton, styles.mainActionButton]}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>VERIFY CREDENTIALS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => router.push("/register")}
                        >
                            <Text style={styles.buttonText}>REQUEST ACCESS</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.secondaryButton, { marginTop: 10 }]}
                        onPress={() => router.push("/")}
                    >
                        <Text style={styles.buttonText}>RETURN TO MAIN TERMINAL</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerText}>VAULT-TEC CORPORATION © 2077</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a2e0a",
        padding: 20,
    },
    pipboyHeader: {
        marginBottom: 20,
        alignItems: 'center',
    },
    pipboyBrand: {
        color: '#14fe17',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    pipboyModel: {
        color: '#14fe17',
        fontSize: 16,
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    screenBorder: {
        borderWidth: 4,
        borderColor: '#14fe17',
        borderRadius: 5,
        width: '100%',
        maxWidth: 400,
        padding: 3,
        backgroundColor: '#000',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
        shadowOpacity: 0.7,
    },
    screen: {
        borderWidth: 2,
        borderColor: '#14fe17',
        borderRadius: 2,
        padding: 20,
        backgroundColor: 'rgba(10, 46, 10, 0.7)',
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#14fe17",
        marginBottom: 10,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    screenSubtitle: {
        color: '#14fe17',
        fontSize: 12,
        marginTop: 5,
        letterSpacing: 3,
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    subtitle: {
        color: '#14fe17',
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        fontStyle: 'italic',
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    mainActionButton: {
        backgroundColor: "rgba(20, 254, 23, 0.3)",
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    secondaryButton: {
        backgroundColor: "rgba(20, 254, 23, 0.1)",
        borderWidth: 1,
        borderColor: '#14fe17',
        paddingVertical: 12,
        marginBottom: 15,
        flex: 1,
        marginLeft: 5,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.3,
    },
    label: {
        color: '#14fe17',
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#14fe17",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: "#14fe17",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        fontSize: 16,
        fontFamily: 'monospace',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
    },
    loginButton: {
        backgroundColor: "rgba(20, 254, 23, 0.2)",
        borderWidth: 1,
        borderColor: '#14fe17',
        paddingVertical: 12,
        marginBottom: 15,
        flex: 1,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    registerButton: {
        backgroundColor: "rgba(20, 254, 23, 0.2)",
        borderWidth: 1,
        borderColor: '#14fe17',
        paddingVertical: 12,
        marginBottom: 15,
        flex: 1,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
    },
    buttonText: {
        color: "#14fe17",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    footerText: {
        marginTop: 20,
        color: "#14fe17",
        fontSize: 12,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
    },
});