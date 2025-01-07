import Image from "next/image";
import { Button, Link } from "@nextui-org/react";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen w-full relative">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/landing.jpg?height=1080&width=1920"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}

          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span>{""}</span>
            <div className="flex gap-4">
              <Button
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white 
                         hover:bg-white/20 transition-all"
                variant="flat"
                //onPress={onOpen}
                href="/auth/sign-in"
                as={Link}
              >
                Ingresar
              </Button>
              <Button
                className="bg-white text-black hover:bg-white/90 transition-all"
                variant="flat"
                href="/auth/sign-up"
                as={Link}
              >
                Comenzar
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 px-6 py-14">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Bienvenido a Hops Sport
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Descubre nuestras funciones y servicios que te ayudarán a alcanzar
              sus objetivos. Únete a nuestra comunidad hoy mismo y comienza tu
              viaje a tu mejor rendimiento.
            </p>

            {/* Search/Email Input */}
            <div className="max-w-md mx-auto flex gap-4"></div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white
                          border border-white/20 hover:bg-white/20 transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4">Feature {item}</h3>
                  <p className="text-white/80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-black/50 backdrop-blur-md mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-6 text-white/70 text-center">
            <p>
              © 2024 Gestion y administración deportiva. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/*<Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Iniciar sesión
              </DrawerHeader>
              <DrawerBody>
                <form className="space-y-4" onSubmit={onSubmit}>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    id="password"
                    label="Password"
                    placeholder="contraseña"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />

                  {error && <p className="text-warning">{error}</p>}
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    Ingresar
                  </Button>
                </form>
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="/auth/forgot-password" size="sm">
                    Olvidaste tu contraseña?
                  </Link>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>*/}
    </>
  );
}
