import React, { useEffect } from 'react'
import {Route, Routes, useLocation} from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import Listing from './pages/Listing'
import CarDetails from './pages/CarDetails'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Contact from './pages/Contact'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Sidebar from './components/onwer/Sidebar'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ListCar from './pages/owner/ListCar'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import AgencyReg from './components/AgencyReg'
import Processing from './pages/Processing'
import AboutPage from './pages/AboutPage'
import Careers from './pages/Careers'
import Press from './pages/Press'
import Partners from './pages/Partners'
import Testimonials from './pages/Testimonials'
import HelpCenter from './pages/HelpCenter'
import InfoPage from './pages/InfoPage'
import Sitemap from './pages/Sitemap'
import NotFound from './pages/NotFound'

const App = () => {
  const {showAgencyReg} = useAppContext()
  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')

  // Start every new page at the top (keep in-page #anchor jumps working)
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <main>
      {!isOwnerPath && <Header />}
      {showAgencyReg && <AgencyReg />}
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listing' element={<Listing />} />
        <Route path='/listing/:id' element={<CarDetails />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:slug' element={<BlogDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/processing/:nextUrl' element={<Processing />} />
        {/* Company */}
        <Route path='/about' element={<AboutPage />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/press' element={<Press />} />
        <Route path='/partners' element={<Partners />} />
        <Route path='/testimonials' element={<Testimonials />} />
        {/* Support & legal */}
        <Route path='/help' element={<HelpCenter />} />
        <Route path='/safety' element={<InfoPage page="safety" />} />
        <Route path='/cancellation' element={<InfoPage page="cancellation" />} />
        <Route path='/accessibility' element={<InfoPage page="accessibility" />} />
        <Route path='/privacy' element={<InfoPage page="privacy" />} />
        <Route path='/terms' element={<InfoPage page="terms" />} />
        <Route path='/sitemap' element={<Sitemap />} />
        {/* Owner */}
        <Route path='/owner' element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path='/owner/add-car' element={<AddCar />}/>
          <Route path='/owner/list-car' element={<ListCar />}/>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isOwnerPath && <Footer />}
    </main>
  )
}

export default App
