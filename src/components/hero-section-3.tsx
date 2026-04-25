import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import InfiniteSliderBasic from './clientsSlider'

export default function HeroSection() {

	const titulo = "¡Impulsa tu negocio!";
	const textoParrafo = "El acceso a financiamiento es crucial para el crecimiento de tu negocio. Nuestra plataforma de solicitud de crédito en línea te ofrece una forma rápida y sencilla de obtener el capital que necesitas para expandir tu empresa, invertir en nuevos proyectos o superar desafíos financieros. Con un proceso completamente digital puedes solicitar tu crédito desde cualquier lugar y en cualquier momento, sin complicaciones ni papeleo innecesario. ¡Impulsa tu negocio con nosotros hoy mismo!";

	return (
		<>
			<main className="overflow-hidden">
				<section className="bg-background">
					<div className="relative py-40">
						<div className="mask-radial-from-45% mask-radial-to-75% mask-radial-at-top mask-radial-[75%_100%] aspect-2/3 absolute inset-0 opacity-75 blur-xl md:aspect-square lg:aspect-video dark:opacity-5">
							<Image
								src="https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=2198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="hero background"
								width={2198}
								height={1685}
								loading="eager"
								className="h-full w-full object-cover object-top"
							/>
						</div>
						<div className="relative z-10 mx-auto w-full max-w-5xl sm:pl-6">
							<div className="flex items-center justify-between max-md:flex-col">
								<div className="max-w-md max-sm:px-6">
									<Image
										src="/cohete2.gif"
										alt="Cohete animado"
										width={64}
										height={64}
										priority
										className="mb-4 h-16 w-16 justify-self-center"
										unoptimized
									/>
									<h1 className="text-balance text-primary font-serif text-4xl font-medium sm:text-5xl">
										{titulo}
									</h1>
									<p className="text-primary mt-4 text-balance">
										{textoParrafo}
									</p>
									<Button
										asChild
										className="m-4"
										variant="default">
										<Link href="/application-process">
											<span className="text-nowrap">
												¡Empezar ahora!
											</span>
										</Link>
									</Button>
									<Button
										asChild
										className="m-4"
										variant="secondary">
										<Link href="#link">
											<span className="text-nowrap">
												¿Necesitas ayuda?
											</span>
										</Link>
									</Button>									
								</div>
								<div
									className="relative max-md:mx-auto max-md:*:scale-90 flex justify-center items-center w-full">
									<Image
										src="/cohete1.gif"
										alt="Cohete animado"
										width={200}
										height={2506}
										priority
										loading="eager"
										className="mx-auto h-64 w-auto transition-transform duration-700 md:hover:-translate-y-80 max-md:mt-20 max-md:animate-bounce"
										unoptimized
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

    {/* INFINITE SLIDER */}
    <section className="bg-background py-6 relative">
			<div className="text-center text-lg font-semibold text-primary"> Nuestros casos de éxito	</div>
			<div className="absolute top-0 left-0 h-full w-14 backdrop-blur-sm bg-white/30 pointer-events-none z-10"></div>
        <InfiniteSliderBasic />
			<div className="absolute top-0 right-0 h-full w-14 backdrop-blur-sm bg-white/30 pointer-events-none z-10"></div>
    </section>				
			</main>
		</>
	)
}
