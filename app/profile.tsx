import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Image, 
  TextInput,
  ScrollView 
} from "react-native";

export default function ProfileScreen() {
    const { user, updateUserProfile } = useAuth();
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        biografia: '',
        telefono: '',
        idioma: 'es',
        fotoPerfil: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                biografia: user.biografia || '',
                telefono: user.telefono || '',
                idioma: user.idioma || 'es',
                fotoPerfil: user.fotoPerfil || ''
            });
        }
    }, [user]);

    const handleSave = async () => {
        try {
            const success = await updateUserProfile(user.uid, {
                nombre: formData.nombre,
                biografia: formData.biografia,
                telefono: formData.telefono,
                idioma: formData.idioma,
                fotoPerfil: formData.fotoPerfil
            });
            
            if (success) {
                Alert.alert("DATABASE UPDATE", "Profile data successfully saved");
                setEditMode(false);
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            Alert.alert("SYSTEM ERROR", error.message);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "UNKNOWN";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).toUpperCase();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Pip-Boy Header */}
                <View style={styles.pipboyHeader}>
                    <Text style={styles.pipboyBrand}>VAULT-TEC</Text>
                    <Text style={styles.pipboyModel}>PIP-BOY 3000 MK IV</Text>
                </View>

                <View style={styles.screenBorder}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>DWELLER PROFILE DATABASE</Text>

                        {formData.fotoPerfil ? (
                            <Image
                                source={{ uri: formData.fotoPerfil }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.profileImagePlaceholder}>
                                <Text style={styles.placeholderText}>NO IMAGE</Text>
                            </View>
                        )}

                        {editMode ? (
                            <>
                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>IDENTIFICATION:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.nombre}
                                        onChangeText={(text) => setFormData({ ...formData, nombre: text })}
                                        placeholder="ENTER FULL NAME"
                                        placeholderTextColor="#14fe17aa"
                                    />
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>PROFILE IMAGE URL:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.fotoPerfil}
                                        onChangeText={(text) => setFormData({ ...formData, fotoPerfil: text })}
                                        placeholder="ENTER IMAGE URL"
                                        placeholderTextColor="#14fe17aa"
                                    />
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>BIO DATA:</Text>
                                    <TextInput
                                        style={[styles.input, { height: 100 }]}
                                        value={formData.biografia}
                                        onChangeText={(text) => setFormData({ ...formData, biografia: text })}
                                        multiline
                                        placeholder="ENTER BIOGRAPHY"
                                        placeholderTextColor="#14fe17aa"
                                    />
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>COMM LINK:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.telefono}
                                        onChangeText={(text) => setFormData({ ...formData, telefono: text })}
                                        keyboardType="phone-pad"
                                        placeholder="ENTER PHONE NUMBER"
                                        placeholderTextColor="#14fe17aa"
                                    />
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>LANGUAGE CODE:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.idioma}
                                        onChangeText={(text) => setFormData({ ...formData, idioma: text })}
                                        placeholder="es/en/fr/etc"
                                        placeholderTextColor="#14fe17aa"
                                    />
                                </View>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={handleSave}
                                    >
                                        <Text style={styles.buttonText}>SAVE DATA</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => setEditMode(false)}
                                    >
                                        <Text style={styles.buttonText}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>IDENTIFICATION:</Text>
                                    <Text style={styles.value}>{user?.nombre?.toUpperCase() || "UNREGISTERED DWELLER"}</Text>
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>VAULT ID:</Text>
                                    <Text style={styles.value}>{user?.email || "NO DATA"}</Text>
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>BIO DATA:</Text>
                                    <Text style={styles.value}>{user?.biografia || "No bio available"}</Text>
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>COMM LINK:</Text>
                                    <Text style={styles.value}>{user?.telefono || "No contact"}</Text>
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>LANGUAGE:</Text>
                                    <Text style={styles.value}>{user?.idioma?.toUpperCase() || "EN"}</Text>
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>REGISTRATION DATE:</Text>
                                    <Text style={styles.value}>{formatDate(user?.creadoEn)}</Text>
                                </View>

                                <View style={styles.dataSection}>
                                    <Text style={styles.label}>FAVORITES:</Text>
                                    <Text style={styles.value}>
                                        {user?.favoritos?.length > 0 
                                            ? user.favoritos.join(", ").toUpperCase() 
                                            : "NONE"}
                                    </Text>
                                </View>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => setEditMode(true)}
                                    >
                                        <Text style={styles.buttonText}>EDIT PROFILE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.returnButton}
                                        onPress={() => router.push("/home")}
                                    >
                                        <Text style={styles.buttonText}>RETURN TO MAIN</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        <Text style={styles.footerText}>VAULT-TEC PERSONNEL SYSTEM © 2077</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a2e0a",
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
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
        marginBottom: 20,
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
        marginBottom: 25,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    dataSection: {
        marginBottom: 15,
    },
    label: {
        color: '#14fe17',
        fontSize: 14,
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    value: {
        color: '#14fe17',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 3,
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#14fe17',
        marginVertical: 20,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
    buttonText: {
        color: "#14fe17",
        fontSize: 16,
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
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#14fe17',
    },
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#14fe17',
        backgroundColor: 'rgba(20, 254, 23, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#14fe17',
        fontSize: 14,
        opacity: 0.7,
    },
    input: {
        borderWidth: 1,
        borderColor: '#14fe17',
        padding: 10,
        marginTop: 5,
        color: '#14fe17',
        backgroundColor: 'rgba(20, 254, 23, 0.1)',
        borderRadius: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    editButton: {
        backgroundColor: 'rgba(20, 254, 23, 0.3)',
        padding: 12,
        borderWidth: 1,
        borderColor: '#14fe17',
        flex: 1,
        borderRadius: 2,
    },
    saveButton: {
        backgroundColor: 'rgba(20, 254, 23, 0.5)',
        padding: 12,
        borderWidth: 1,
        borderColor: '#14fe17',
        flex: 1,
        borderRadius: 2,
    },
    cancelButton: {
        backgroundColor: 'rgba(20, 254, 23, 0.5)',
        padding: 12,
        borderWidth: 1,
        borderColor: '#14fe17',
        flex: 1,
        borderRadius: 2,
    },
    returnButton: {
        backgroundColor: 'rgba(20, 254, 23, 0.2)',
        padding: 12,
        borderWidth: 1,
        borderColor: '#14fe17',
        flex: 1,
        borderRadius: 2,
    },
});