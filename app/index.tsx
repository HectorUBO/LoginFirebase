import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Efecto de escaneo CRT (simulado con un overlay)} */}
            <View style={styles.scanlines} />
            
            {/* Contenido Pip-Boy */}
            <View style={styles.pipboyContainer}>
                {/* Cabecera Pip-Boy */}
                <View style={styles.header}>
                    <Text style={styles.brand}>VAULT-TEC</Text>
                    <Text style={styles.model}>PIP-BOY 3000 MK IV</Text>
                    <Text style={styles.subtitle}>SYSTEM BOOTING...</Text>
                </View>

                {/* Logo Vault-Tec estilizado */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <View style={styles.logoInnerCircle}>
                            <Text style={styles.logoText}>V A U L T</Text>
                            <Text style={styles.logoText}>- T E C -</Text>
                        </View>
                    </View>
                    <View style={styles.logoGlow} />
                </View>

                {/* Mensaje de sistema */}
                <View style={styles.systemMessage}>
                    <Text style={styles.systemText}>> VAULT-OS v4.2.7</Text>
                    <Text style={styles.systemText}>> SYSTEMS CHECK: OK</Text>
                    <Text style={styles.systemText}>> AUTH REQUIRED</Text>
                </View>

                {/* Botón de acceso */}
                <TouchableOpacity 
                    style={styles.accessButton}
                    onPress={() => router.push("/login")}
                >
                    <Text style={styles.accessButtonText}>INITIATE LOGIN SEQUENCE</Text>
                    <View style={styles.buttonPulse} />
                </TouchableOpacity>

                {/* Pie de página */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>VAULT-TEC PROPRIETARY SYSTEM</Text>
                    <Text style={styles.footerText}>© 2077 VAULT-TEC CORPORATION</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a2e0a',
    },
    scanlines: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'rgba(20, 254, 23, 0.05)',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
    },
    pipboyContainer: {
        width: '90%',
        maxWidth: 400,
        borderWidth: 4,
        borderColor: '#14fe17',
        borderRadius: 5,
        padding: 3,
        backgroundColor: 'rgba(0, 20, 0, 0.8)',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        shadowOpacity: 0.8,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#14fe17',
    },
    brand: {
        color: '#14fe17',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 3,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    model: {
        color: '#14fe17',
        fontSize: 16,
        letterSpacing: 2,
        marginTop: 5,
        textShadowColor: 'rgba(20, 254, 23, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    subtitle: {
        color: '#14fe17',
        fontSize: 12,
        letterSpacing: 4,
        marginTop: 10,
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 30,
        position: 'relative',
    },
    logoCircle: {
        borderWidth: 3,
        borderColor: '#14fe17',
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(10, 46, 10, 0.5)',
    },
    logoInnerCircle: {
        borderWidth: 1,
        borderColor: '#14fe17',
        borderRadius: 80,
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#14fe17',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 3,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    logoGlow: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(20, 254, 23, 0.1)',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        shadowOpacity: 0.6,
    },
    systemMessage: {
        backgroundColor: 'rgba(0, 30, 0, 0.5)',
        borderWidth: 1,
        borderColor: '#14fe17',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 25,
    },
    systemText: {
        color: '#14fe17',
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: 20,
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
    },
    accessButton: {
        backgroundColor: 'rgba(20, 254, 23, 0.1)',
        borderWidth: 2,
        borderColor: '#14fe17',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    accessButtonText: {
        color: '#14fe17',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
        zIndex: 1,
    },
    buttonPulse: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(20, 254, 23, 0.05)',
        shadowColor: '#14fe17',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#14fe17',
        paddingTop: 10,
        paddingBottom: 5,
    },
    footerText: {
        color: '#14fe17',
        fontSize: 11,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(20, 254, 23, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        marginBottom: 3,
    },
});