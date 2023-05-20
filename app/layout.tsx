import './globals.css'
import {Nunito} from 'next/font/google'
import Navbar from "@/app/components/header/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const nunito = Nunito({subsets: ['latin']})

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone using nextJs13 app Router, tailwindcss, typescript',
}

type Props = {
    children: React.ReactNode
}
export default async function RootLayout({children}: Props) {
    const currentUser = await getCurrentUser()
    return (
        <html lang="en" >
        <body className={nunito.className} >
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
        </body >
        </html >
    )
}
