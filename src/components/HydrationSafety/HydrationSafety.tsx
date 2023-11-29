import { ReactNode, useEffect, useState } from "react"

type HydrationSafetyProps = {
    children: ReactNode
}

const HydrationSafety = ({ children }: HydrationSafetyProps) => {
    const [isHydrated, setIsHydrated] = useState(false)

    // Wait till Next.js rehydration completes
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return isHydrated ? <div>{children}</div> : null;
}

export default HydrationSafety