import { create, StateCreator } from "zustand";
import { signIn, signOutAction, SignUpResponse } from "@/app/auth/actions";
import { devtools, persist } from "zustand/middleware";

type AuthState = {
  user: any | null;
  rolePermission: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, code: string, password: string) => Promise<void>;
  signOut: () => void;
  setRolePermission: (role: any) => void;
  reset: () => void;
};

const storeAuthApi: StateCreator<AuthState> = (set) => ({
  user: null,
  rolePermission: null,
  signIn: async (email, password) => {
    const signInResponse: SignUpResponse = await signIn(email, password);

    if (signInResponse.error) {
      set({ user: null, rolePermission: null });
      throw new Error(signInResponse.error);
    }

    set({
      user: {
        id: signInResponse.data?.id,
        ...signInResponse.userProfile,
      },
    });

    set({ rolePermission: signInResponse.rolePermission });
  },

  signOut: () => {
    set({ user: null, rolePermission: null });
    signOutAction();
  },
  signUp: async () => {},
  setRolePermission: () => {},
  reset: () => set({ user: null, rolePermission: null }),
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeAuthApi, { name: "authStore" }))
);
