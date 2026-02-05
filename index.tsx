import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// --- Data & Assets ---
const DATA = {
  brand: {
    name: "Hotel Calandre",
    logo: "https://hweb-upload.s3.sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/d7cbfb16cb434192b181900fdbef5dc4.png",
  },
  content: {
    headline: "ACOMODAÇÕES COMO VOCÊ NUNCA VIU!",
    subheadline: "Acomodações confortáveis e restaurante no Hotel Calandre. Estratégia e conforto na Zona Norte de SP.",
  },
  images: {
    hero: "https://hweb-upload.s3-sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/6358b42713b94c4c854b959f82af0566.webp",
    room1: "https://hweb-upload.s3.sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/c4bd03024e504824b2f7b7159ba13d8f.jpg",
    room2: "https://hweb-upload.s3-sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/6358b42713b94c4c854b959f82af0566.webp",
    food1: "https://hweb-upload.s3-sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/8aec7a6ff26c4a3d84aba088cbb2cec8.webp",
    food2: "https://hweb-upload.s3-sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/7874bda1a89748bbb667e40da3958c7e.webp",
    gallery: "https://hweb-upload.s3-sa-east-1.amazonaws.com/67f9118d5b06cdd00d62ba62/e5715630b20e41e2a0ec5ecf9835429c.webp"
  },
  contact: {
    phone: "+55 (11) 3965-4219",
    whatsapp: "https://api.whatsapp.com/send?l=pt_BR&phone=5511982497190",
    address: "R Jose de Oliveira, 37 - Casa Verde, São Paulo, SP",
    email: "hotelcalandre39@gmail.com",
    instagram: "https://www.instagram.com/hotelcalandre/"
  }
};

// --- Icons (SVGs) ---
const Icons = {
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
  Utensils: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
  ),
  Wifi: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
  ),
  Car: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  ),
  BedDouble: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"></path><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path><path d="M12 4v6"></path><path d="M2 18h20"></path></svg>
  )
};

// --- Components ---

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  href?: string;
  target?: string;
  [key: string]: any;
}

const Button = ({ children, variant = "primary", className = "", href, ...props }: ButtonProps) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3 text-base font-medium transition-all duration-300 transform hover:-translate-y-0.5 rounded-full shadow-lg";
  const variants: Record<string, string> = {
    primary: "bg-brand-red text-white hover:bg-red-700 hover:shadow-red-500/30",
    secondary: "bg-white text-brand-dark border-2 border-transparent hover:border-gray-200",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-dark"
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyle} ${variants[variant || "primary"]} ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${baseStyle} ${variants[variant || "primary"]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Acomodações", href: "#acomodacoes" },
    { name: "Gastronomia", href: "#gastronomia" },
    { name: "Localização", href: "#localizacao" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-900/95 backdrop-blur-md shadow-md py-4 border-b border-white/10" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 z-50">
           <img 
            src={DATA.brand.logo} 
            alt="Hotel Calandre Logo" 
            className="h-12 w-auto object-contain filter drop-shadow-md"
           />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                isScrolled 
                  ? "text-slate-200 hover:text-white" // Texto claro no fundo escuro
                  : "text-white hover:text-slate-200 drop-shadow-md" // Texto claro no fundo transparente
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button href={DATA.contact.whatsapp} target="_blank" variant="primary">
            Reservar
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Força o ícone a ser branco sempre, ou escuro se o menu mobile estiver aberto (fundo branco) */}
          <div className={`p-2 rounded-md transition-colors ${isMobileMenuOpen ? "text-slate-900" : "text-white"}`}>
            {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-2xl font-serif text-slate-800 hover:text-brand-red transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button href={DATA.contact.whatsapp} target="_blank" className="mt-4">
              Fazer Reserva
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like fix */}
      <div className="absolute inset-0 z-0">
        <img 
          src={DATA.images.hero} 
          alt="Quarto Luxo Hotel Calandre" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white mt-16">
        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-medium tracking-widest uppercase mb-6 bg-white/10 backdrop-blur-sm">
          Zona Norte • São Paulo
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
          ACOMODAÇÕES COMO <br/> <span className="text-brand-red">VOCÊ NUNCA VIU!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {DATA.content.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={DATA.contact.whatsapp} target="_blank" variant="primary">
            Reservar via WhatsApp
          </Button>
          <Button href="#acomodacoes" variant="outline">
            Conhecer Quartos
          </Button>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  key?: React.Key;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-brand-red mb-6 group-hover:scale-110 transition-transform">
      <Icon />
    </div>
    <h3 className="font-serif text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const Features = () => {
  const benefits = [
    {
      icon: Icons.MapPin,
      title: "Localização Estratégica",
      description: "Acesso rápido aos Terminais Tietê e Barra Funda, além dos aeroportos de Congonhas e Guarulhos."
    },
    {
      icon: Icons.Utensils,
      title: "Gastronomia Completa",
      description: "Restaurante próprio com pratos rápidos, lanches deliciosos e um farto café da manhã."
    },
    {
      icon: Icons.BedDouble,
      title: "Conforto e Lazer",
      description: "Quartos equipados com ar-condicionado, TV a cabo e academia completa para os hóspedes."
    }
  ];

  return (
    <section className="py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">Por que escolher o Hotel Calandre?</h2>
          <div className="w-20 h-1 bg-brand-red mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <FeatureCard key={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Rooms = () => {
  return (
    <section id="acomodacoes" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <span className="text-brand-red font-bold text-sm tracking-wider uppercase">Nossos Quartos</span>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mt-2">Descanso e Sofisticação</h2>
          </div>
          <a href={DATA.contact.whatsapp} className="hidden md:flex items-center gap-2 text-brand-red font-medium hover:underline mt-4 md:mt-0">
            Verificar disponibilidade <Icons.ArrowRight />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Room Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer">
            <img 
              src={DATA.images.room2} 
              alt="Quarto Luxo" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-serif text-2xl font-bold mb-2">Suíte Luxo</h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Ideal para casais, com cama queen size e decoração moderna.
              </p>
              <div className="flex gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1"><Icons.Wifi /> Wi-Fi</span>
                <span className="flex items-center gap-1"><Icons.CheckCircle /> Ar Condicionado</span>
              </div>
            </div>
          </div>

          {/* Room Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer">
            <img 
              src={DATA.images.room1} 
              alt="Quarto Plus" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-serif text-2xl font-bold mb-2">Quarto Plus</h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Espaço e conforto para sua viagem de negócios.
              </p>
              <div className="flex gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1"><Icons.Wifi /> Wi-Fi</span>
                <span className="flex items-center gap-1"><Icons.CheckCircle /> TV a Cabo</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button href={DATA.contact.whatsapp} target="_blank">
             Verificar disponibilidade
          </Button>
        </div>
      </div>
    </section>
  );
};

const Gastronomy = () => {
  return (
    <section id="gastronomia" className="py-24 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-brand-red font-bold text-sm tracking-wider uppercase">Restaurante Próprio</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6 leading-tight">
              Sabores que <br/>Encantam
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Não é preciso sair do hotel para ter uma experiência gastronômica incrível. 
              Nosso restaurante oferece pratos rápidos, lanches e um buffet de café da manhã 
              completo para começar o seu dia com energia.
            </p>
            
            <ul className="space-y-4 mb-10">
              {['Café da manhã completo', 'Pratos À La Carte', 'Lanches rápidos', 'Room Service'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <span className="text-brand-red"><Icons.CheckCircle /></span> {item}
                </li>
              ))}
            </ul>
            
            <Button href={DATA.contact.whatsapp} target="_blank">
              Ver Cardápio
            </Button>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img 
              src={DATA.images.food1} 
              className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8" 
              alt="Café da Manhã"
            />
            <img 
              src={DATA.images.food2} 
              className="rounded-2xl shadow-lg w-full h-64 object-cover" 
              alt="Prato do Restaurante"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="localizacao" className="relative py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Localização Privilegiada</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Estamos no coração da Casa Verde, facilitando seu deslocamento para qualquer ponto de São Paulo.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg text-brand-red">
                  <Icons.MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Endereço</h4>
                  <p className="text-gray-400">{DATA.contact.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg text-brand-red">
                  <Icons.Car />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Proximidade</h4>
                  <p className="text-gray-400">Tietê, Barra Funda e Anhembi a poucos minutos.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DATA.contact.address)}`} target="_blank" variant="outline">
                Abrir no Google Maps
              </Button>
            </div>
          </div>
          
          <div className="h-[400px] w-full bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative group cursor-pointer">
             <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-10 group-hover:bg-slate-900/40 transition-colors duration-300">
                <div className="text-center p-6 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl transform transition-transform duration-300 group-hover:scale-105">
                    <div className="mx-auto w-16 h-16 bg-brand-red text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-brand-red/20">
                        <Icons.MapPin />
                    </div>
                    <p className="text-white font-medium text-lg">Ver mapa interativo</p>
                    <p className="text-slate-400 text-sm mt-1">Clique para expandir</p>
                </div>
             </div>
             
             <img 
                src={DATA.images.gallery} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-100 group-hover:scale-110 transform"
                alt="Localização do Hotel"
             />
             
             <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DATA.contact.address)}`}
                target="_blank"
                className="absolute inset-0 z-20"
                aria-label="Abrir mapa no Google Maps"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
             <img 
                src={DATA.brand.logo} 
                alt="Hotel Calandre" 
                className="h-10 opacity-80 mb-4 filter brightness-0 invert" 
             />
             <p className="text-sm text-slate-500">
               Hospedagem com conforto e qualidade na Zona Norte de São Paulo.
             </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-brand-red transition-colors">Início</a></li>
              <li><a href="#acomodacoes" className="hover:text-brand-red transition-colors">Acomodações</a></li>
              <li><a href="#gastronomia" className="hover:text-brand-red transition-colors">Gastronomia</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Icons.Phone /> {DATA.contact.phone}</li>
              <li className="flex items-center gap-2"><Icons.Menu /> {DATA.contact.email}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href={DATA.contact.instagram} className="p-2 bg-slate-800 rounded-full hover:bg-brand-red transition-colors text-white">
                <Icons.Instagram />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Hotel Calandre. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Desenvolvido com excelência.</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href={DATA.contact.whatsapp}
    target="_blank"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group"
    aria-label="Fale conosco no WhatsApp"
  >
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    <span className="hidden group-hover:inline pr-2 font-semibold">Fale Conosco</span>
  </a>
);

const App = () => {
  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-brand-red selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Rooms />
      <Gastronomy />
      <Location />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}