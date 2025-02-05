// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// // Custom hook to check authentication status
// const useAuth = () => {
//   const { data: session, status } = useSession();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     if (status === "authenticated") {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [status]);

//   return { isAuthenticated, session, status };
// };

// export default useAuth;
