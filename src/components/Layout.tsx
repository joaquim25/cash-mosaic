import Footer from "./Footer"
import Navbar from "./Navbar"


function Layout({ children }: { children: React.JSX.Element }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>

    )
}

export default Layout