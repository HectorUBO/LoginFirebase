import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function RegisterScreen() {
    const { register } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        telefono: '',
        biografia: ''
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async () => {
        if (!formData.email || !formData.password || !formData.nombre) {
            Alert.alert('Error', 'Nombre, email y contraseña son requeridos');
            return;
        }

        const success = await register(
            formData.email,
            formData.password,
            {
                nombre: formData.nombre,
                telefono: formData.telefono,
                biografia: formData.biografia
            }
        );

        if (success) {
            Alert.alert("VAULT REGISTRATION", "New dweller added to database.");
            router.replace("/login");
        } else {
            Alert.alert("SYSTEM ERROR", "Unable to process registration.");
        }
    }

    return (
        <View style={styles.container}>
            {/* Pip-Boy Header */}
            <View style={styles.pipboyHeader}>
                <Text style={styles.pipboyBrand}>VAULT-TEC</Text>
                <Text style={styles.pipboyModel}>PIP-BOY 3000 MK IV</Text>
                <Text style={styles.screenSubtitle}>REGISTRATION TERMINAL</Text>
            </View>

            <View style={styles.screenBorder}>
                <View style={styles.screen}>
                    <Text style={styles.title}>VAULT REGISTER SYSTEM</Text>
                    <Text style={styles.subtitle}>VAULT-TEC APPROVAL REQUIRED</Text>

                    <Text style={styles.label}>VAULT ID (EMAIL):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENTER VAULT-TEC EMAIL"
                        placeholderTextColor="#14fe17"
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>ACCESS CODE:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENTER SECURITY CODE"
                        placeholderTextColor="#14fe17"
                        value={formData.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry
                    />

                    <Text style={styles.label}>DWELLER NAME:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENTER FULL NAME"
                        placeholderTextColor="#14fe17"
                        value={formData.nombre}
                        onChangeText={(text) => handleChange('nombre', text)}
                    />

                    <Text style={styles.label}>CONTACT FREQUENCY:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENTER RADIO FREQUENCY"
                        placeholderTextColor="#14fe17"
                        value={formData.telefono}
                        onChangeText={(text) => handleChange('telefono', text)}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>DWELLER BIO:</Text>
                    <TextInput
                        style={[styles.input, styles.bioInput]}
                        placeholder="ENTER BIO INFORMATION"
                        placeholderTextColor="#14fe17"
                        value={formData.biografia}
                        onChangeText={(text) => handleChange('biografia', text)}
                        multiline
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.secondaryButton]}
                            onPress={() => router.push("/login")}
                        >
                            <Text style={styles.buttonText}>RETURN TO LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.registerButton]}
                            onPress={handleRegister}
                        >
                            <Text style={styles.buttonText}>SUBMIT REGISTRATION</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>ALL INFORMATION WILL BE VERIFIED BY VAULT-TEC</Text>
                        <Text style={styles.footerText}>VAULT-TEC CORPORATION © 2077</Text>
                    </View>
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
        textShadowColor: '#14fe17',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    pipboyModel: {
        color: '#14fe17',
        fontSize: 16,
        letterSpacing: 1,
        marginTop: 5,
    },
    screenSubtitle: {
        color: '#14fe17',
        fontSize: 12,
        marginTop: 5,
        letterSpacing: 3,
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
        shadowRadius: 10,
        shadowOpacity: 0.5,
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
        textShadowColor: '#14fe17',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    subtitle: {
        color: '#14fe17',
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    label: {
        color: '#14fe17',
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
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
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButton: {
        backgroundColor: "rgba(20, 254, 23, 0.2)",
        borderWidth: 1,
        borderColor: '#14fe17',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    registerButton: {
        backgroundColor: "rgba(20, 254, 23, 0.2)",
        borderWidth: 1,
        borderColor: '#14fe17',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    buttonText: {
        color: "#14fe17",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 1,
    },
    footer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#14fe17',
        paddingTop: 10,
    },
    footerText: {
        color: "#14fe17",
        fontSize: 12,
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 5,
    },
});