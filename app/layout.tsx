import './globals.css'
import {Nunito} from 'next/font/google'
import Navbar from "@/app/components/header/Navbar";
import ClientOnly from "@/app/components/wrappers/ClientOnly";

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
        <ClientOnly >
            <Navbar />
        </ClientOnly >
        {children}
        </body >
        </html >
    )
}
