import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import userStore from "@/app/store/user.store";
import { auth } from "@/services/firebase.service";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";
import { Toast } from "@/utils/toast.swal";

export function useFirebase() {
  //  Hooks
  const store = userStore();
  const router = useRouter();

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

  async function setUser(user: UserCredential) {
    store.user = user.user;
    await Swal.fire("Bienvenido", "", "success").then(() => router.push({ path: "/" }));
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((user: UserCredential) => {
        setUser(user);
      })
      .catch((error) => {
        const { code } = error;
        Toast.fire("No se pudo iniciar sesión", "", "error").then(() => console.log(code));
      });
  }

  return {
    currentUser,
    signInWithGoogle,
  };
}
