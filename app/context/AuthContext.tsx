import { auth, db } from "@/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  User
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";

interface UserData {
  correo: string;
  nombre: string;
  creadoEn: string;
  fotoPerfil: string;
  biografia: string;
  telefono: string;
  idioma: string;
  favoritos: string[];
  ultimaActualizacion: string;
}

interface AuthContextType {
  user: (User & UserData) | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, userData?: Partial<UserData>) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (userId: string, updateData: Partial<UserData>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<(User & UserData) | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Obtener datos adicionales de Firestore
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                
                if (userDoc.exists()) {
                    setUser({
                        ...firebaseUser,
                        ...userDoc.data() as UserData
                    });
                } else {
                    // Crear documento básico si no existe
                    const defaultUserData: UserData = {
                        correo: firebaseUser.email || '',
                        nombre: '',
                        creadoEn: new Date().toISOString(),
                        fotoPerfil: 'https://img.icons8.com/fluent-systems-regular/512/40C057/-fallout-vault-boy.png',
                        biografia: '',
                        telefono: '',
                        idioma: 'es',
                        favoritos: [],
                        ultimaActualizacion: new Date().toISOString()
                    };
                    
                    await setDoc(doc(db, "users", firebaseUser.uid), defaultUserData);
                    setUser({
                        ...firebaseUser,
                        ...defaultUserData
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Failed to login. Please check your credentials.");
            return false;
        }
    };

    const register = async (
        email: string, 
        password: string, 
        userData?: Partial<UserData>
    ): Promise<boolean> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const completeUserData: UserData = {
                correo: email,
                nombre: userData?.nombre || '',
                creadoEn: new Date().toISOString(),
                fotoPerfil: userData?.fotoPerfil || 'https://img.icons8.com/fluent-systems-regular/512/40C057/-fallout-vault-boy.png',
                biografia: userData?.biografia || '',
                telefono: userData?.telefono || '',
                idioma: userData?.idioma || 'es',
                favoritos: userData?.favoritos || [],
                ultimaActualizacion: new Date().toISOString()
            };

            await setDoc(doc(db, "users", userCredential.user.uid), completeUserData);
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Error", (error as Error).message);
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    const updateUserProfile = async (
        userId: string, 
        updateData: Partial<UserData>
    ): Promise<boolean> => {
        try {
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, {
                ...updateData,
                ultimaActualizacion: new Date().toISOString()
            });

            // Actualizar el estado local manteniendo los datos existentes
            setUser(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    ...updateData
                };
            });

            return true;
        } catch (error) {
            console.error("Update profile error:", error);
            Alert.alert("Error", "Failed to update profile");
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            register, 
            logout, 
            updateUserProfile 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}