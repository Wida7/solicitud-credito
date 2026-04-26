'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/hooks'
import { clearSession } from '@/modules/auth/store/authSlice'
import { toast } from 'sonner'

interface MenuItem {
	name: string
	href: string
}

const menuItems: MenuItem[] = [
	/*     { name: 'Features', href: '/features' },
			{ name: 'Pricing', href: '/pricing' },
			{ name: 'Contact', href: '/contact' }, */
]

export const HeroHeader = () => {
	const [menuState, setMenuState] = React.useState(false)
	const [isScrolled, setIsScrolled] = React.useState(false)
	const pathname = usePathname()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const session = useAppSelector((state) => state.auth.session)

	const handleEmployeeAction = () => {
		if (!session) {
			router.push('/view/login')
			setMenuState(false)
			return
		}

		dispatch(clearSession())
		setMenuState(false)
		toast.success('Sesion cerrada correctamente', {
			position: 'top-center',
			className: 'bg-primary text-primary-foreground font-semibold',
		})

		if (pathname.startsWith('/view/admin')) {
			router.push('/view/login')
			return
		}

		router.refresh()
	}

	const handleListApplications = () => {
		router.push('/view/admin/reviews')
		setMenuState(false)
		return
	}

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	return (
		<header>
			<nav
				data-state={menuState && 'active'}
				className={cn('fixed z-20 w-full transition-all duration-300 top-0', isScrolled && 'bg-background/75 border-b border-black/5 backdrop-blur-lg')}>
				<div className="mx-auto max-w-5xl px-6">
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-6 lg:gap-0">
						<div className="flex w-full justify-between gap-6 lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="flex items-center space-x-2">
								<Logo />
								Impulsa
							</Link>

							<button
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
								<Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-primary" />
								<X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>
						</div>

						<div className="absolute inset-0 m-auto hidden size-fit lg:block">
							<ul className="flex gap-1">
								{menuItems.map((item, index) => (
									<li key={index}>
										<Button
											asChild
											variant="ghost"
											size="sm">
											<Link
												href={item.href}
												className="text-base">
												<span>{item.name}</span>
											</Link>
										</Button>
									</li>
								))}
							</ul>
						</div>

						<div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							{/* Condicional para mostrar el menu en mobile si tiene items */}
							{menuItems.length > 0 &&
								<div className="lg:hidden">
									<ul className="space-y-6 text-base">
										{menuItems.map((item, index) => (
											<li key={index}>
												<Link
													href={item.href}
													className="text-muted-foreground hover:text-accent-foreground block duration-150">
													<span>{item.name}</span>
												</Link>
											</li>
										))}
									</ul>
								</div>
							}
							<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
								<Button
									key="login"
									variant="ghost"
									size="sm"
									onClick={handleEmployeeAction}
									className={cn(isScrolled && 'lg:hidden')}>
									<span>{session ? 'Cerrar sesion' : 'Soy empleado'}</span>
								</Button>
								{session ? <Button
									key="listApplications"
									variant="default"
									size="sm"
									onClick={handleListApplications}
									className={cn(isScrolled && 'lg:hidden')}>
									<span>Listar aplicaciones</span>
								</Button> : ''}
								{/* 								<Button
									asChild
									size="sm"
									className={cn(isScrolled && 'lg:hidden')}>
									<Link href="#">
										<span>Sign Up</span>
									</Link>
								</Button> */}
								<Button
									asChild
									size="sm"
									className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
									<Link href="#">
										<span>Get Started</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
