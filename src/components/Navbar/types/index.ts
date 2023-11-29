import { MouseEventHandler } from "react";
import { AnyAction } from "redux";

export type NavItem = {
    href: string;
    content?: string;
    icon?: React.ReactNode;
    class?: string;
    action?: any;
}