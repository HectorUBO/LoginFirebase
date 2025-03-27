import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function HomeScreen() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user]);

    const formatDate = (dateString) => {
        if (!dateString) return "UNKNOWN";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).toUpperCase();
    };

    return (
        <View style={styles.container}>
            {/* Pip-Boy Header */}
            <View style={styles.pipboyHeader}>
                <Text style={styles.pipboyBrand}>VAULT-TEC</Text>
                <Text style={styles.pipboyModel}>PIP-BOY 3000 MK IV</Text>
            </View>

            <View style={styles.screenBorder}>
                <View style={styles.screen}>
                    <Text style={styles.title}>VAULT DWELLER STATUS</Text>

                    {user?.fotoPerfil && (
                        <Image
                            source={{ uri: user.fotoPerfil }}
                            style={styles.profileImage}
                        />
                    )}

                    {/* Cambio realizado aquí: user?.nombre en lugar de user?.name */}
                    <Text style={styles.welcomeText}>WELCOME, {user?.nombre?.toUpperCase() || "DWELLER"}</Text>
                    <Text style={styles.userId}>VAULT ID: {user?.email || "UNREGISTERED"}</Text>

                    <View style={styles.divider} />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => router.push("./profile")}
                        >
                            <Text style={styles.buttonText}>PROFILE DATABASE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => { logout(); router.replace("./login") }}
                        >
                            <Text style={styles.buttonText}>TERMINATE SESSION</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.footerText}>STATUS: ONLINE | VAULT-TEC © 2077</Text>
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
        marginBottom: 15,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    welcomeText: {
        fontSize: 20,
        color: "#14fe17",
        marginBottom: 5,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    userId: {
        fontSize: 14,
        color: "#14fe17",
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    divider: {
        height: 1,
        backgroundColor: '#14fe17',
        marginVertical: 15,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
    buttonContainer: {
        width: "100%",
        maxWidth: 300,
        marginVertical: 10,
        marginLeft: 20,
    },
    menuButton: {
        backgroundColor: "rgba(20, 254, 23, 0.2)",
        borderWidth: 1,
        borderColor: '#14fe17',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 2,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    logoutButton: {
        backgroundColor: "rgba(20, 254, 23, 0.2)",
        borderWidth: 1,
        borderColor: '#14fe17',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 2,
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
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
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#14fe17',
    },
});