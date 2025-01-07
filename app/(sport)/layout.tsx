import Footer from "./layouts/footer";
import NavBar from "./layouts/navBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full relative">
      <NavBar></NavBar>
      <div className="p-4">{children}</div>

      <Footer></Footer>
    </main>
  );
}
