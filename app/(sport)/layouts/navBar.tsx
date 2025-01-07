"use client";
import { signOutAction } from "@/app/auth/actions";
import {
  ChevronDown,
  PersonLogoIcon,
  Activity,
  Clock,
  PagosIcon,
  AcademiaIcon,
} from "@/app/components/ui/icons";
import { createClient } from "@/app/utils/supabase/client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarProps,
  NavbarMenuItem,
  Button,
  Divider,
  NavbarMenu,
  cn,
  NavbarMenuToggle,
  DropdownSection,
} from "@nextui-org/react";
import { useAuthStore } from "@/app/store/authStore";

import { forwardRef, useCallback, useEffect, useState } from "react";

const menuItems = [
  { title: "Mi Cuenta", href: "/profile", desc: "Tu perfil de usuario" },
  {
    title: "Entrenamientos",
    href: "/workouts",
    desc: "Entrenamientos personalizados",
  },
  { title: "Administración", href: "/admin", desc: "Administra tu cuenta" },
  {
    title: "Gestión Deportiva",
    href: "/sports",
    desc: "Gestiona tus deportes",
  },
  {
    title: "Actualizaciones",
    href: "/updates",
    desc: "Actualizaciones de la app",
  },
  { title: "Acerca de", href: "/about", desc: "Conoce más sobre nosotros" },
  { title: "Blog", href: "/blog", desc: "Nuestro blog" },

  { title: "Contactanos", href: "/contact", desc: "Contactanos" },
];

/*
export function hasPermission(user: User, permission: Permission) {
  return user.roles.some((role) =>
    (ROLES[role] as readonly Permission[]).includes(permission)
  );
}
*/
const BasicNavbar = forwardRef<HTMLElement, NavbarProps>(
  ({ classNames = {}, ...props }, ref) => {
    const icons = {
      chevron: <ChevronDown fill="currentColor" size={16} />,
      activity: <Activity fill="currentColor" size={16} />,
      clock: <Clock fill="currentColor" height={16} with={16} size={16} />,
      pagos: <PagosIcon fill="currentColor" height={16} with={16} size={16} />,
      academiaIcon: (
        <AcademiaIcon fill="currentColor" height={16} with={16} size={16} />
      ),
    };

    const rolePermission = useAuthStore((state) => state.rolePermission);
    const userStore = useAuthStore((state) => state.user);
    const signOut = useAuthStore((state) => state.signOut);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const supabase = createClient();
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    const hasPermission = (permission: string) => {
      return rolePermission?.[userStore.role_id].find(
        (p: any) => p.permission_name == permission
      );
    };

    const getProfile = useCallback(async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUsername(user.email!);
          setAvatarUrl(user.user_metadata.avatar_url ?? null);
        } else {
          setUsername("Usuario no autenticado");
          setAvatarUrl(null);
        }
      } catch {
        console.log("Error loading user data!");
      } finally {
      }
    }, [supabase]);

    useEffect(() => {
      getProfile();
    }, []);

    return (
      <Navbar
        ref={ref}
        {...props}
        classNames={{
          base: cn("mt-2  border-default-100 bg-transparent", {
            "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
          }),
          wrapper: "w-full justify-center",

          item: [
            "hidden md:flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
          ...classNames,
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left Content */}
        <NavbarBrand>
          <p className="text-primary">Hops Sport</p>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center">
          <NavbarItem
            isActive
            className="data-[active='true']:font-medium[date-active='true']"
          >
            <Link
              aria-current="page"
              className="text-default-foreground"
              href="#"
              size="sm"
            >
              Inicio
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem className="data-[active='true']:font-medium[date-active='true']">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                >
                  Entrenamientos
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Cognitivos"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="cognitivo"
                description="Herramientas visuales y auditivas"
                startContent={icons.activity}
              >
                Cognitivos
              </DropdownItem>
              <DropdownItem
                key="temporizadores"
                description="Temporizadores para tus entrenamientos"
                startContent={icons.clock}
              >
                Temporizadores
              </DropdownItem>

              <DropdownItem
                key="hiit"
                description="Entrenamientos de alta intensidad"
                startContent={icons.clock}
              >
                HIIT
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {hasPermission("gym:create") && (
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                  >
                    Administración
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Cognitivos"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  description="Toda la información de tu academia"
                  startContent={icons.academiaIcon}
                  as={Link}
                  href="/academy/admin"
                >
                  Mi academia
                </DropdownItem>
                <DropdownItem
                  key="usage_metrics"
                  description="Panel de control para tus gestión financiera"
                  startContent={icons.pagos}
                  as={Link}
                  href="/academy/payment"
                >
                  Pagos y Facturación
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Noticias y Eventos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Salud y bienestar
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          as="div"
          className="hidden md:flex items-center"
          justify="end"
        >
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {avatar_url ? (
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={username ?? "avatar"}
                  size="md"
                  src={avatar_url}
                />
              ) : (
                <Avatar
                  fallback={<PersonLogoIcon />}
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={username ?? "avatar"}
                  size="md"
                ></Avatar>
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider title={username || ""}>
                <>
                  {menuItems.map((item, index) => (
                    <DropdownItem
                      key={`${item}-${index}`}
                      description={item.desc}
                      startContent={icons.activity}
                    >
                      {item.title}
                    </DropdownItem>
                  ))}
                </>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => {
                    signOut(); //store
                  }}
                >
                  Cerrar Sesión
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarMenuToggle className="text-default-400 md:hidden" />

        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: "easeInOut",
              duration: 0.2,
            },
          }}
        >
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="mb-2 w-full text-default-500" href="#" size="md">
                {item.title}
              </Link>
              {index < menuItems.length - 1 && (
                <Divider className="opacity-50" />
              )}
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className="mb-4">
            <Button
              fullWidth
              className="bg-foreground text-background"
              onPress={() => {
                signOut(); //store
              }}
            >
              Cerrar sesión
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
  }
);

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;
