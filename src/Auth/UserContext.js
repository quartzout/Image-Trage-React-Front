import { createContext } from "react";

/**
 * Контекст, хранящий объект user, описывающий пользователя, и колбеки fetchUser и removeUser. Значения контексту предоставляет AuthProvider,
 * а компоненты, использующие этот контект, должны прописать useAuth()
 */
export const UserContext = createContext(null);