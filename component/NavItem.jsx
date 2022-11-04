import React from "react";
import Link from "next/link";

const NavItem = ({ href, text, active}) => {
    return (
        <Link href={href}>
            <legacyBehavior className={` nav__link ${active ? "active" : ""}`}>
                {text}
            </legacyBehavior>
        </Link>
    )
}

export default NavItem;