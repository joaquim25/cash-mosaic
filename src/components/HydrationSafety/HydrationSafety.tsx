import { useEffect, useState } from "react"

const HydrationSafety = ({ children }: any) => {
    const [isHydrated, setIsHydrated] = useState(false)

    // Wait till Next.js rehydration completes
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return isHydrated ? <div>{children}</div> : null;
}

export default HydrationSafety