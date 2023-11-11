import Footer from "./Footer/Footer"
import Navbar from "./Navbar/Navbar"
import { usePathname } from 'next/navigation'


function Layout({ children }: { children: React.JSX.Element }) {
    const pathname = usePathname()

    return (
        <>
            <Navbar />
            <main>{children}</main>
            {pathname !== "/login" && pathname !== "/signup" && <Footer />}
        </>

    )
}

export default Layout