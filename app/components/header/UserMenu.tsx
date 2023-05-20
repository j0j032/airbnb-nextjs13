'use client'

import React, {useCallback} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/header/Avatar";
import MenuItem from "@/app/components/header/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/app/types";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu = ({currentUser}: UserMenuProps) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative" >
            <div className="flex flex-row items-center gap-3" >
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={() => {
                    }} >
                    Airbnb your home
                </div >

                <div
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                    onClick={toggleOpen} >
                    <AiOutlineMenu />
                    <div className="hidden md:block" >
                        <Avatar src={currentUser?.image} />
                    </div >
                </div >
            </div >

            {isOpen && (
                <div
                    className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm" >
                    <div className="flex flex-col cursor-pointer" >
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => console.log('click')} label="My trips" />
                                <MenuItem onClick={() => console.log('click')} label="My favorites" />
                                <MenuItem onClick={() => console.log('click')} label="My reservations" />
                                <MenuItem onClick={() => console.log('click')} label="My properties" />
                                <MenuItem onClick={() => console.log('click')} label="Airbnb my home" />
                                <hr />
                                <MenuItem onClick={() => signOut()} label="Logout" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="login" />
                                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                            </>
                        )}
                    </div >
                </div >
            )}
        </div >
    )
};

export default UserMenu;
