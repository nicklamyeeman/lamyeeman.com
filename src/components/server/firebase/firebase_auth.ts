import { createUserWithEmailAndPassword } from "firebase/auth";
import "./firebase_init";
import { auth } from "./firebase_init";
import { updateFirebaseValue } from "./firebase_utils";

export const registerUser = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password).then(({ user }) =>
    updateFirebaseValue(`/lamyeeman/users/${user.uid}`, { email: user.email })
  );
