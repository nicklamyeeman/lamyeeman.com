import { UserRoles } from "@/types/user";
import { getFirebaseValue } from "../firebase/firebase_utils";

export const fetchUserRole = (userId: string) =>
    getFirebaseValue<UserRoles>(`/users/${userId}/role`).then((snapshot) => snapshot.val());