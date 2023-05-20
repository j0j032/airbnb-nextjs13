import './globals.css'
import {Nunito} from 'next/font/google'
import Navbar from "@/app/components/header/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";

const nunito = Nunito({subsets: ['latin']})

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone using nextJs13 app Router, tailwindcss, typescript',
}

type Props = {
    children: React.ReactNode
}
export default function RootLayout({children}: Props) {
    return (
        <html lang="en" >
        <body className={nunito.className} >
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
        </body >
        </html >
    )
}
