import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Navigation from '../Navigation';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/projects',
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
  work: 'WORK',
  studio: 'STUDIO',
  lostMark: 'LOST MARK',
  vtt: 'VTT',
  vttServices: 'VTT SERVICES',
  about: 'ABOUT',
  contact: 'CONTACT',
  timer: 'TIMER',
  getUpdates: 'GET UPDATES',
  featuredWork: 'FEATURED WORK',
  caseFiles: 'CASE FILES',
  tools: 'TOOLS / EXTRAS',
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
  it('renders focused primary navigation links', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    const nav = screen.getByLabelText('Main navigation');

    expect(within(nav).getByText('WORK')).toBeInTheDocument();
    expect(within(nav).getByText('VTT SERVICES')).toBeInTheDocument();
    expect(within(nav).getByText('STUDIO')).toBeInTheDocument();
    expect(within(nav).getByText('CONTACT')).toBeInTheDocument();
    expect(within(nav).queryByText('TIMER')).not.toBeInTheDocument();
  });

  it('renders skip to content link', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getAllByText('EN').length).toBeGreaterThan(0);
    expect(screen.getAllByText('RU').length).toBeGreaterThan(0);
  });

  it('renders mobile dossier drawer with case files and tools', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    fireEvent.click(screen.getByLabelText('Open menu'));

    expect(screen.getByRole('dialog', { name: 'Main menu' })).toBeInTheDocument();
    expect(screen.getByText('CASE FILES')).toBeInTheDocument();
    expect(screen.getByText('TOOLS / EXTRAS')).toBeInTheDocument();
    expect(screen.getByText('Chronometer')).toBeInTheDocument();
  });

  it('marks current primary link as active', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    const workLink = screen.getByRole('link', { name: 'WORK' });
    expect(workLink).toHaveAttribute('aria-current', 'page');
  });

  it('has accessible navigation landmark', () => {
    render(<Navigation lang="en" dict={defaultDict} />);
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
  });
});
