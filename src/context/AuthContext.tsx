import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  BOOTSTRAPPED_ADMIN_EMAIL,
} from '../firebase';

interface AuthContextValue {
  user: User | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  adminRole: 'admin' | 'editor' | null;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthReady: false,
  isAdmin: false,
  adminRole: null,
  authError: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<'admin' | 'editor' | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthError(null);

      if (!currentUser) {
        setIsAdmin(false);
        setAdminRole(null);
        setIsAuthReady(true);
        return;
      }

      const emailLower = (currentUser.email || '').toLowerCase();
      if (
        currentUser.emailVerified &&
        emailLower === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
      ) {
        setIsAdmin(true);
        setAdminRole('admin');
        setIsAuthReady(true);
        return;
      }

      try {
        const adminRef = doc(db, 'admins', currentUser.uid);
        const snap = await getDoc(adminRef);
        if (snap.exists() && currentUser.emailVerified) {
          const data = snap.data() as { role?: string };
          const role = data.role === 'editor' ? 'editor' : 'admin';
          setIsAdmin(true);
          setAdminRole(role);
        } else {
          setIsAdmin(false);
          setAdminRole(null);
        }
      } catch {
        setIsAdmin(false);
        setAdminRole(null);
      } finally {
        setIsAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unable to complete Google sign-in.';
      setAuthError(msg);
    }
  };

  const signOut = async () => {
    setAuthError(null);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to sign out.';
      setAuthError(msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthReady,
        isAdmin,
        adminRole,
        authError,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
