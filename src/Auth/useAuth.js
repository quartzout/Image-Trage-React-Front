import { useContext } from "react";
import { UserContext } from "./UserContext";

/**
 * Кастомный хук, позволяющий использовать из контекста обьект user и колбеки fetchUser и removeUser, задаваемые AuthProvider.
 * Короткая версия записи useContext(UserContext)
 */
export default function useAuth() {
    return useContext(UserContext)
}