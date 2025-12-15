// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { CurrentUser } from "../types/user";
// import { getCurrentUser } from "../services/get-current-user";

// interface GetCurrentUserContextValue {
//   user: CurrentUser | null;
//   loading: boolean;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
// }

// const GetCurrentUserContext = createContext<
//   GetCurrentUserContextValue | undefined
// >(undefined);

// export const GetCurrentUserProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<CurrentUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const data = await getCurrentUser();
//       console.log("current user: ", data)
//       setUser(data);
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     fetchUser();
//   }, []);

//   const logout = () => {

//     localStorage.removeItem("access_token");
//     localStorage.removeItem("user");
//     document.cookie =
//       "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//     window.location.href = "/login";
//   };

//   return (
//     <GetCurrentUserContext.Provider
//       value={{
//         user,
//         loading,
//         refreshUser: fetchUser,
//         logout,
//       }}
//     >
//       {children}
//     </GetCurrentUserContext.Provider>
//   );
// };

// export const useGetCurrentUser = () => {
//   const context = useContext(GetCurrentUserContext);
//   if (!context) {
//     throw new Error(
//       "useGetCurrentUser harus dipakai di dalam GetCurrentUserProvider",
//     );
//   }
//   return context;
// };
