'use client'

import React from 'react';
import Container from "@/app/components/ui/Container";
import Logo from "@/app/components/header/Logo";
import Search from "@/app/components/header/Search";
import UserMenu from "@/app/components/header/UserMenu";
import {SafeUser} from "@/app/types";
import Categories from "@/app/components/header/Categories";

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar = ({currentUser}: NavbarProps) => {
    
    return (
        <header className="fixed w-full bg-white z-10 shadow-sm" >
            <div className="py-4 border-b-[1px]" >
                <Container >
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0" >
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div >
                </Container >
            </div >
            <Categories />
        </header >
    );
};

export default Navbar;
