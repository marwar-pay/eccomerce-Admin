
// import Payinout from './Payinamout'
// import Ticketdetails from './Ticketdetails'
// import Blog from "../../assets/images/Blog.png"
// import { useUser } from '../../Context/UserContext'
// import { apiGet } from '../../api/apiMethods'
// import { useEffect, useState } from 'react'
// import ProductOverview from './ProductOverview'
// import UserOverview from './UserOverview'
// import Vendor from './Vendor'

// function Dashbord() {
//   const { user } = useUser()
//   const [data, setData] = useState();

//   const API_ENDPOINT = `api/dashboard`;

//   const fetchData = async () => {
//     try {
//       const response = await apiGet(API_ENDPOINT);
//       if (response.status === 200) {
//         setData(response.data?.data)
//       }
//     } catch (error) {
//       console.error(error.message);
//       setData();
//     }
//   };
//   useEffect(() => {
//     fetchData()
//   }, [])

//   return (
//     <div>
//       <div style={{ height: '200px' }} className='topsidebar'>
//         <div className='flex' style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
//         <h1 className="sidebar-text">
//   Welcome {user?.firstName} {user?.role === "vendor" && user?.ownerName}!
// </h1>



//           {/* {user && user.role === "vendor" && <h1 className='sidebar-text'>Wallet : {user.wallet}</h1>} */}
//           <img style={{ maxHeight: '100%', width: 'unset' }} className='sidebar-image' src={Blog} alt="Blog" />
//         </div>
//       </div>
//       {user?.role === "vendor" ? (
//                 <Vendor />
//             ) : (
                
//               <>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                   <div style={{ width: '50%' }}>
//                       <ProductOverview products={data?.productStats} stats totalProducts />
//                   </div>
//                   <div style={{ width: '50%' }}>
//                       <UserOverview users={data?.userStats} />
//                   </div>
//               </div>
//               <Payinout orders={data?.orders} />
//           </>
//             )}
//  {/* {user?.role !== "vendor" && (
//     <>
//         <div style={{ display: 'flex', gap: '10px' }}>
//             <div style={{ width: '50%' }}>
//                 <ProductOverview products={data?.productStats} stats totalProducts />
//             </div>
//             <div style={{ width: '50%' }}>
//                 <UserOverview users={data?.userStats} />
//             </div>
//         </div>
//         <Payinout orders={data?.orders} />
//     </>
// )} */}

//     </div>
//   )
// }

// export default Dashbord


import { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserContext';
import { apiGet } from '../../api/apiMethods';
import Payinout from './Payinamout';
import Ticketdetails from './Ticketdetails';
import Blog from "../../assets/images/Blog.png";
import ProductOverview from './ProductOverview';
import UserOverview from './UserOverview';
import Vendor from './Vendor';

function Dashboard() {
  const { user, initializeUser } = useUser(); // Ensure user context is refreshed
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_ENDPOINT = `api/dashboard`;

  const fetchData = async () => {
    try {
      const response = await apiGet(API_ENDPOINT);
      if (response.status === 200) {
        setData(response.data?.data);
      }
    } catch (error) {
      console.error(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeUser(); // Ensure user data is fetched properly
    fetchData();
  }, []);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div style={{ height: '200px' }} className='topsidebar'>
        <div className='flex' style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <h1 className="sidebar-text">
            Welcome {user?.firstName} {user?.role === "vendor" && user?.ownerName}!
          </h1>
          <img style={{ maxHeight: '100%', width: 'unset' }} className='sidebar-image' src={Blog} alt="Blog" />
        </div>
      </div>

      {user?.role === "vendor" ? (
        <Vendor />
      ) : (
        <>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50%' }}>
              <ProductOverview products={data?.productStats} />
            </div>
            <div style={{ width: '50%' }}>
              <UserOverview users={data?.userStats} />
            </div>
          </div>
          <Payinout orders={data?.orders} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
