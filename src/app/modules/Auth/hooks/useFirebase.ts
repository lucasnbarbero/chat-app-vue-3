import { auth } from "@/services/firebase.service";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export function useFirebase() {
  async function currentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user: User | null) => resolve(user),
        (error: Error) => reject(error)
      );
      unsubscribe();
    });
  }

  return {
    currentUser,
  };
}
