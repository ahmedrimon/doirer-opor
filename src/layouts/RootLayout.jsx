
import { Outlet } from 'react-router'
import Navbar from '../shared/Navbar/Navbar'
import Footer from '../shared/Footer/Footer'
import CrosshairCursor from '../effects/CrosshairCursor'


export default function RootLayout() {
  return (
    <div>
        <CrosshairCursor></CrosshairCursor>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
