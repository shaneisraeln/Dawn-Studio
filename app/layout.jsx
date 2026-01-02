import { Montserrat, Lato } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700']
})

const lato = Lato({ 
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700']
})

export const metadata = {
  title: 'Dawn HD Studio - Luxury Wedding & Family Photography',
  description: 'Premier luxury photography and filmmaking studio specializing in weddings, pre-wedding shoots, and family portraits.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} ${lato.variable} font-lato bg-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
