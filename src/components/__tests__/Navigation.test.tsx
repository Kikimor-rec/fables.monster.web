import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock Next.js modules
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/en',
}));

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

const defaultDict = {
  home: 'HOME',
  projects: 'PROJECTS',
  lostMark: 'LOST MARK',
  about: 'ABOUT',
  contact: 'CONTACT',
  timer: 'TIMER',
  mainNavigation: 'Main navigation',
  mainMenu: 'Main menu',
  mobileNavigation: 'Mobile navigation',
  homeAriaLabel: 'Home',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  skipToContent: 'Skip to content',
  languageSelection: 'Language selection',
};

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  it('renders skip to content link', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    const enLinks = screen.getAllByText('EN');
    const ruLinks = screen.getAllByText('RU');
    expect(enLinks.length).toBeGreaterThan(0);
    expect(ruLinks.length).toBeGreaterThan(0);
  });

  it('renders mobile menu button', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('marks current page link as active', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    const homeLinks = screen.getAllByText('HOME');
    const homeLink = homeLinks.find(el => el.closest('a'));
    expect(homeLink?.closest('a')).toHaveAttribute('aria-current', 'page');
  });

  it('has accessible navigation landmark', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
  });
});
