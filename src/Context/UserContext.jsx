import { createContext, useState, useContext, useEffect } from "react";
import { apiGet } from "../api/apiMethods";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [categories, setCategories] = useState([])
    const [logoURL, setLogoURL] = useState("")
    const token = sessionStorage.getItem('accessToken')

    // const initializeUser = async () => {
    //     try {
    //         const response = await apiGet("api/auth/userInfo");
    //         if (response.status === 200) {
    //             setUser(response.data?.user);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch user data:", error.message);
    //     }
    // };


    // const initializeUser = async () => {
    //     try {
    //         const response = await apiGet("api/auth/userInfo");
    //         if (response.status === 200 && response.data?.user) {
    //             setUser(response.data.user);
    //         } else {
    //             // Agar pehli API se user data na mile to doosri API call karo
    //             const response = await apiGet("http://192.168.1.13:5067/api/vendor-info");
    //             if (response.status === 200 && response.data?.vendor) {
    //                 setUser(response.data.vendor);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch user data:", error.message);
    //         try {
    //             // Pehli API fail ho gayi to doosri API se data lene ki koshish karo
    //             const response = await apiGet("api/vendor-info");
    //             if (response.status === 200 && response.data?.vendor) {
    //                 setUser(response.data.vendor);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch vendor data:", error.message);
    //         }
    //     }
    // };
    

//     const initializeUser = async () => {
//     try {
//         const response = await apiGet("api/auth/userInfo");
//         if (response.status === 200 && response.data?.user) {
//             setUser(response.data.user);
//         } else {
//             // If first API fails, try fetching vendor data
//             const response = await apiGet("http://192.168.1.13:5067/api/vendor-info");
//             if (response.status === 200 && response.data?.vendor) {
//                 setUser(response.data.vendor);
//             }
//         }
//     } catch (error) {
//         console.error("Failed to fetch user data:", error.message);
//         try {
//             // If first attempt fails, try another vendor endpoint
//             const response = await apiGet("api/vendor-info");
//             if (response.status === 200 && response.data?.vendor) {
//                 setUser(response.data.vendor); // Use vendor data instead of `user`
//             }
//         } catch (error) {
//             console.error("Failed to fetch vendor data:", error.message);
//         }
//     }
// };


const initializeUser = async () => {
    try {
        const response = await apiGet("api/auth/userInfo");
        if (response.status === 200 && response.data?.user ) {
            setUser(response.data.user);
        } else {
            // If first API fails, try fetching vendor data
            // const response = await apiGet("api/vendor-info");
            const response = await apiGet("api/vendor-info");
            if (response.status === 200 && response.data?.vendor && response.data.stats) {
                setUser(response.data.vendor);
                setStats(response.data.stats );
            }
        }
    } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      
    }
};

    useEffect(() => {
        if (token) {
            initializeUser();
        }
    }, [token]);


    useEffect(() => {
        (async () => {
            try {
                if (!user) return;
                const { data } = await apiGet(`api/website/${user.referenceWebsite}`)
                setCategories(data.website.categories);
                setLogoURL(data.logoUrl);
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [user])

    return (
        <UserContext.Provider value={{ user, stats, setUser, initializeUser, categories, setCategories, logoURL }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
