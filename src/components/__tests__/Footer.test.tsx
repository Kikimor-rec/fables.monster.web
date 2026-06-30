import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

const defaultFooterDict = {
  homeAriaLabel: 'Home',
  projectsAriaLabel: 'Featured work',
  linksAriaLabel: 'Studio and services',
  tagline: 'Test Tagline',
  brandLabel: 'Independent dossier',
  projects: 'OUR PROJECTS',
  featuredWork: 'FEATURED WORK',
  links: 'OUR LINKS',
  studioServices: 'STUDIO / SERVICES',
  tools: 'TOOLS / EXTRAS',
  connect: 'CONNECT',
  about: 'About Us',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  social: 'SOCIAL MEDIA',
  newsletter: 'Newsletter ->',
  getUpdates: 'GET UPDATES',
  lostMarkTerminal: 'Silk Star Terminal',
  chronometer: 'Chronometer',
  copyright: '(c) {year} Fables Monster Studio. All rights reserved.',
  allProjects: 'All projects',
};

const defaultNewsletterDict = {
  footer: {
    title: 'FOOTER NEWSLETTER',
    description: 'Test description',
    subscribe: 'Subscribe',
    learnMore: 'Learn More',
  },
  compact: {
    emailPlaceholder: 'email@example.com',
    submit: 'SUBSCRIBE NOW',
    subscribing: 'Loading...',
    success: 'Done!',
  },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe('Footer', () => {
  it('renders conversion hub sections', () => {
    render(<Footer lang="en" dict={defaultFooterDict} newsletterDict={defaultNewsletterDict} />);

    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('FEATURED WORK')).toBeInTheDocument();
    expect(screen.getByText('STUDIO / SERVICES')).toBeInTheDocument();
    expect(screen.getByText('TOOLS / EXTRAS')).toBeInTheDocument();
    expect(screen.getByText('CONNECT')).toBeInTheDocument();
  });

  it('renders footer link groups and tool access', () => {
    render(<Footer lang="en" dict={defaultFooterDict} newsletterDict={defaultNewsletterDict} />);

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(4);
    expect(headings[0]).toHaveTextContent('FEATURED WORK');
    expect(headings[1]).toHaveTextContent('STUDIO / SERVICES');
    expect(headings[2]).toHaveTextContent('TOOLS / EXTRAS');
    expect(headings[3]).toHaveTextContent('CONNECT');
    expect(screen.getByText('Silk Star Terminal')).toBeInTheDocument();
    expect(screen.getByText('Chronometer')).toBeInTheDocument();
  });

  it('replaces {year} dynamically in copyright', () => {
    render(<Footer lang="en" dict={defaultFooterDict} newsletterDict={defaultNewsletterDict} />);

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
