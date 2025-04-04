import { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Vendor = () => {
    const { user, stats, categories, logoURL } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && stats) {
            setTimeout(() => setLoading(false), 800);
        }
    }, [user, stats]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center'
            }}>
                <div>
                    <div style={{
                        border: '5px solid #f3f3f3',
                        borderTop: '5px solid #4BC0C0',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 15px'
                    }}></div>
                    <p>Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    // Chart data configurations
    const ordersData = {
        labels: ['Total', 'Completed'],
        datasets: [
            {
                label: 'Orders',
                data: [stats?.totalOrders, stats?.completedOrders],
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderColor: ['#FF6384', '#36A2EB'],
                borderWidth: 1,
            },
        ],
    };

    const amountData = {
        labels: ['Pending', 'Completed', 'Weekly', 'Monthly', 'Yearly'],
        datasets: [
            {
                label: 'Amounts',
                data: [
                    stats?.totalPendingAmount,
                    stats?.totalCompletedAmount,
                    stats?.weeklyTotal,
                    stats?.currentMonthTotal,
                    stats?.currentYearTotal,
                ],
                backgroundColor: [
                    '#FF9F40',
                    '#4BC0C0',
                    '#9966FF',
                    '#FFCD56',
                    '#C9CBCF',
                ],
                borderColor: [
                    '#FF9F40',
                    '#4BC0C0',
                    '#9966FF',
                    '#FFCD56',
                    '#C9CBCF',
                ],
                borderWidth: 1,
            },
        ],
    };

    const monthlyTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Sales Trend',
                data: [12000, 19000, 15000, 22000, 18000, 25000],
                fill: false,
                backgroundColor: '#4BC0C0',
                borderColor: '#4BC0C0',
                tension: 0.4,
            },
        ],
    };

    const statCards = [
        { title: 'Total Orders', value: stats?.totalOrders ?? "N/A", icon: '📦', color: '#FF6384' },
        { title: 'Completed Orders', value: stats?.completedOrders ?? "N/A", icon: '✅', color: '#36A2EB' },
        { title: 'Pending Amount', value: `₹${stats?.totalPendingAmount ?? "N/A"}`, icon: '⏳', color: '#FF9F40' },
        { title: 'Completed Amount', value: `₹${stats?.totalCompletedAmount ?? "N/A"}`, icon: '💰', color: '#4BC0C0' },
        { title: 'Weekly Total', value: `₹${stats?.weeklyTotal ?? "N/A"}`, icon: '📅', color: '#9966FF' },
        { title: 'Monthly Total', value: `₹${stats?.currentMonthTotal ?? "N/A"}`, icon: '🗓️', color: '#FFCD56' },
        { title: 'Yearly Total', value: `₹${stats?.currentYearTotal ?? "N/A"}`, icon: '📊', color: '#C9CBCF' },
        { title: 'Total Products', value: stats?.totalProducts ?? "N/A", icon: '🛍️', color: '#8AC249' },
    ];
    

    return (
        <div  className= "container" style={{
            fontFamily: "'Arial', sans-serif",
            color: '#333',
            padding: '20px',
            maxWidth: '1400px',
            margin: '0 auto',
            opacity: 0,
            animation: 'fadeIn 0.5s forwards'
        }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes slideInLeft {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #eee'
            }}>
                <img 
                    src={logoURL} 
                    alt="Website Logo" 
                    style={{
                        height: '60px',
                        transition: 'all 0.3s ease',
                        animation: 'slideInLeft 0.5s forwards'
                    }} 
                />
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: '0',
                    animation: 'slideInRight 0.5s forwards'
                }}>Welcome, {user?.ownerName}</h1>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    {statCards.map((stat, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                borderTop: `4px solid ${stat.color}`,
                                animation: `slideInUp 0.5s forwards`,
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0
                            }}
                        >
                            <div style={{ fontSize: '32px', marginBottom: '15px' }}>{stat.icon}</div>
                            <h3 style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '10px' }}>{stat.title}</h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50', margin: '0' }}>{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '25px',
                marginBottom: '30px'
            }}>
                <div style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    animation: 'slideInLeft 0.5s forwards',
                    animationDelay: '0.8s',
                    opacity: 0
                }}>
                    <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#2c3e50', fontSize: '18px' }}>Orders Overview</h3>
                    <Pie data={ordersData} />
                </div>

                <div style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    animation: 'slideInRight 0.5s forwards',
                    animationDelay: '1.0s',
                    opacity: 0
                }}>
                    <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#2c3e50', fontSize: '18px' }}>Amounts Distribution</h3>
                    <Bar data={amountData} />
                </div>

                <div style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    gridColumn: 'span 2',
                    animation: 'slideInUp 0.5s forwards',
                    animationDelay: '1.2s',
                    opacity: 0
                }}>
                    <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#2c3e50', fontSize: '18px' }}>Monthly Sales Trend</h3>
                    <Line data={monthlyTrendData} />
                </div>
            </div>

            <div style={{
                marginTop: '30px',
                animation: 'fadeIn 0.5s forwards',
                animationDelay: '1.4s',
                opacity: 0
            }}>
                <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#2c3e50', marginBottom: '20px' }}>Categories</h2>
                {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {categories.map((category, count,index) => (
                       
                        <span 
                            key={category.id} 
                            style={{
                                background: '#e0f7fa',
                                color: '#00838f',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                cursor: 'default',
                                transition: 'all 0.2s ease',
                                animation: 'fadeIn 0.5s forwards',
                                animationDelay: `${1.6 + (index * 0.1)}s`,
                                opacity: 0
                            }}
                        >
                            <div 
                            
                            style={{ 
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                     
                                animation: `slideInUp 0.5s forwards`,
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0
                            }}
                        >
                            {category.name}
                            <p>{count}</p>
                            </div>
                        </span>
                    ))}
                </div> */}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {Object.entries(stats.categories).map(([category, count], index) => (
        <span 
        key={category} 
        style={{
            background: '#e0f7fa',
            color: '#00838f',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            cursor: 'default',
            transition: 'all 0.2s ease',
            animation: 'fadeIn 0.5s forwards',
            animationDelay: `${1.6 + (index * 0.1)}s`,
            opacity: 0
        }}
    >
         <div 
                            
                            style={{ 
                                background: '#fff',
                                padding: '20px 25px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                     
                                animation: `slideInUp 0.5s forwards`,
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0
                            }}
                        >
            {category}
            <p>{count ?? "N/A"}</p>
            </div>
        </span>
    ))}
</div>

            </div>
        </div>
    );
};

export default Vendor;