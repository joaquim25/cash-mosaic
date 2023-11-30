export const motionAn_toRight = {
    initial: {
        x: "-100%",
        opacity: 0,
    },
    whileInView: {
        x: 0,
        opacity: 1,
    },
    transition: {
        duration: .6
    }
}

export const motionAn_toLeft = {
    initial: {
        x: "100%",
        opacity: 0,
    },
    whileInView: {
        x: 0,
        opacity: 1,
    },
    transition: {
        duration: .6
    }
}