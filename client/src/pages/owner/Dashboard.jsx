import React, { useEffect, useState } from "react";
import { assets } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const {axios, getToken, user, currency} = useAppContext()
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/bookings/agency', {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        setDashboardData(data.dashboardData)

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  useEffect(() => {
    if (user) {
      getDashboardData();
    }
  }, [user]);

  const fmt = (n) => Number(n || 0).toLocaleString("en-IN");
  const paidCount = dashboardData.bookings.filter((b) => b.isPaid).length;
  const stats = [
    { label: "Total Bookings", value: String(dashboardData?.totalBookings || 0).padStart(2, "0"), bg: "bg-primaryOne", accent: "text-solid" },
    { label: "Total Earnings", value: `${currency}${fmt(dashboardData?.totalRevenue)}`, bg: "bg-primaryTwo", accent: "text-accent" },
    { label: "Paid Bookings", value: String(paidCount).padStart(2, "0"), bg: "bg-primaryThree", accent: "text-green-600" },
  ];

  return (
    <div className="px-3 md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 card">
      <div className="mb-6">
        <span className="eyebrow">Overview</span>
        <h3 className="mt-1">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}</h3>
        <p className="mt-1">Track bookings and earnings for your agency.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`flexStart gap-5 p-5 ${stat.bg} rounded-2xl ring-1 ring-slate-900/5`}>
            <div className="h-12 w-12 rounded-xl bg-white flexCenter shadow-soft">
              <img src={assets.carBlack} alt="" className="w-7" />
            </div>
            <div>
              <h3 className={stat.accent}>{stat.value}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Latest Booking / Sales */}
      <div className="mt-8">
        <h4 className="mb-3">Latest Bookings</h4>
        <div className="rounded-2xl ring-1 ring-slate-900/5 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-primary text-xs font-bold uppercase tracking-wide text-gray-50">
            <span className="hidden lg:block">#</span>
            <span>Car</span>
            <span>Booking Dates</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {dashboardData.bookings.length === 0 && (
            <p className="px-6 py-10 text-center">No bookings yet. They will show up here once customers book your cars.</p>
          )}
          {dashboardData.bookings.map((booking, index) => (
            <div
              key={booking._id || index}
              className="flex justify-between items-center flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-white hover:bg-primary/60 transition text-textColor text-sm font-semibold border-t border-slate-900/5"
            >
              <div className="hidden lg:block text-gray-50">{index + 1}</div>
              <div className="flexStart gap-x-3 max-w-64">
                <div className="bg-primaryOne rounded-lg p-1">
                  <img src={booking.car.images[0]} alt={booking.car.title} className="w-16 h-10 object-contain" />
                </div>
                <div className="line-clamp-2">{booking.car.title}</div>
              </div>
              <div className="text-gray-50">
                {new Date(booking.pickUpDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} to{" "}
                {new Date(booking.dropOffDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
              <div>{currency}{fmt(booking.totalPrice)}</div>
              <span
                className={`${
                  booking.isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                } w-fit px-3 py-1 rounded-full text-xs font-bold`}
              >
                {booking.isPaid ? "Paid" : "Unpaid"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
