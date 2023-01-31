import clsx from 'clsx';
import { Facebook, Github, Linkedin, Twitter } from 'react-bootstrap-icons';
import NavigationItem from './NavigationItem';
import SocialIcon from './SocialIcon';

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps): JSX.Element {
  return (
    <footer className={clsx('container mx-auto mb-8 flex flex-col items-center', className)}>
      <nav>
        <ul className="flex space-x-8">
          <NavigationItem
            href="/about"
            text="About"
          />

          <NavigationItem
            href="/blog"
            text="Blog"
          />

          <NavigationItem
            href="/faq"
            text="FAQ"
          />
          <NavigationItem
            href="/contact"
            text="Contact Us"
          />

          <NavigationItem
            href="/privacy"
            text="Privacy"
          />
        </ul>
      </nav>

      <div className="mt-8">
        <ul className="flex space-x-6">
          <SocialIcon
            href="#"
            icon={Facebook}
          />

          <SocialIcon
            href="#"
            icon={Twitter}
          />

          <SocialIcon
            href="#"
            icon={Linkedin}
          />

          <SocialIcon
            href="#"
            icon={Github}
          />
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Vevericka. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
