import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-serenity-light border-t border-serenity-lavender/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/mini-logo-black.png" alt="Logo" width={32} height={32} className="w-8 h-8 rounded-xl" />
              <span className="text-xl font-semibold bg-gradient-to-r from-serenity-blue to-serenity-accent bg-clip-text text-transparent">
                Connexio
              </span>
            </div>
            <p className="text-serenity-navy/70 mb-4 max-w-md font-varela">
              La plateforme qui connecte vos besoins business avec des prestataires humains 
              et des agents IA intelligents. Simplicité, efficacité, Sérénité.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-serenity-navy mb-4 font-oswald">Plateforme</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/chat" className="text-serenity-navy/70 hover:text-serenity-blue transition-colors font-varela">
                  Chat IA
                </Link>
              </li>
              <li>
                <Link href="/prestataire" className="text-serenity-navy/70 hover:text-serenity-blue transition-colors font-varela">
                  Devenir prestataire
                </Link>
              </li>
              <li>
                <Link href="/credits" className="text-serenity-navy/70 hover:text-serenity-blue transition-colors font-varela">
                  Acheter des crédits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-serenity-navy mb-4 font-oswald">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-serenity-navy/70 hover:text-serenity-blue transition-colors font-varela">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="text-serenity-navy/70 hover:text-serenity-blue transition-colors font-varela">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-serenity-navy/70 hover:text-serenity-blue transition-colors font-varela">
                  Conditions d'utilisation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-serenity-lavender/30 mt-8 pt-8 text-center">
          <p className="text-serenity-navy/50 font-varela">
            <Image src="/mini-logo-black.png" alt="Logo" width={20} height={20} className="inline-block mr-2 align-middle" />
            © 2025 Connexio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 