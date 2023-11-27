import { Box, Typography } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    currentTab: number;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, currentTab, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={currentTab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {currentTab === index && (
                <Box sx={{ p: 3 }}>
                    <>{children}</>
                </Box>
            )}
        </Typography>
    );
}