import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import userStore from "@/app/store/user.store";
import { auth } from "@/services/firebase.service";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";
import { Toast } from "@/utils/toast.swal";
import type { FormActions } from "vee-validate";

export function useFirebaseAuth() {
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

  async function register(email: string, password: string, callback: Function) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user: UserCredential) => {
        setUser(user);
      })
      .catch((error) => {
        const { code } = error;
        Toast.fire("No se pudo iniciar sesión", "", "error").then(() => console.log(code));
      });
  }

  async function setUser(user: UserCredential) {
    store.user = user.user;
    await Swal.fire("Bienvenido", "", "success").then(() => router.push({ path: "/" }));
  }

  return {
    currentUser,
    signInWithGoogle,
    register,
  };
}
