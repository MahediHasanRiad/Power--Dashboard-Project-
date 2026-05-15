import { Toaster } from "sonner"

export default function RootLayout({ children }: {children: string}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors theme="dark" />
      </body>
    </html>
  )
}