export type NavItem = {
    href: string;
    content?: string;
    icon?: React.ReactNode;
    class?: string;
    action?: () => void;
}