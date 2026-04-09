import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

const defaultFooterDict = {
    homeAriaLabel: 'Home',
    projectsAriaLabel: 'Projects',
    linksAriaLabel: 'Links',
    tagline: 'Test Tagline',
    projects: 'OUR PROJECTS',
    links: 'OUR LINKS',
    about: 'About Us',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    social: 'SOCIAL MEDIA',
    copyright: '© {year} Fables Monster Studio. All rights reserved.',
    allProjects: 'All projects'
};

const defaultNewsletterDict = {
    footer: {
        title: 'FOOTER NEWSLETTER',
        description: 'Test description',
        subscribe: 'Subscribe',
        learnMore: 'Learn More'
    },
    compact: {
        emailPlaceholder: 'email@example.com',
        submit: 'SUBSCRIBE NOW',
        subscribing: 'Loading...',
        success: 'Done!'
    }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe('Footer', () => {
    it('renders all sections properly', () => {
        render(<Footer lang="en" dict={defaultFooterDict} newsletterDict={defaultNewsletterDict} />);
        
        expect(screen.getByText('Test Tagline')).toBeInTheDocument();
        expect(screen.getByText('OUR PROJECTS')).toBeInTheDocument();
        expect(screen.getByText('OUR LINKS')).toBeInTheDocument();
        expect(screen.getByText('SOCIAL MEDIA')).toBeInTheDocument();
        expect(screen.getByText('FOOTER NEWSLETTER')).toBeInTheDocument();
    });

    it('renders correct hierarchy using h3 tags', () => {
        render(<Footer lang="en" dict={defaultFooterDict} newsletterDict={defaultNewsletterDict} />);
        
        const headings = screen.getAllByRole('heading', { level: 3 });
        expect(headings).toHaveLength(4);
        expect(headings[0]).toHaveTextContent('OUR PROJECTS');
        expect(headings[1]).toHaveTextContent('OUR LINKS');
        expect(headings[2]).toHaveTextContent('SOCIAL MEDIA');
        expect(headings[3]).toHaveTextContent('FOOTER NEWSLETTER');
    });

    it('replaces {year} dynamically in copyright', () => {
        render(<Footer lang="en" dict={defaultFooterDict} newsletterDict={defaultNewsletterDict} />);
        
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
        expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    });
});
