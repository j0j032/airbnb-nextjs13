'use client'

import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
        <Image src="/images/airbnb.svg"
               className="hidden md:block cursor-pointer"
               alt="Logo"
               height="100"
               width="100" />
    );
};

export default Logo;
