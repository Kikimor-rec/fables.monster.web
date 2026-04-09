import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterForm from '../NewsletterForm';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

const defaultDict = {
  title: 'Join Newsletter',
  description: 'Get updates',
  emailPlaceholder: 'email@example.com',
  submit: 'Subscribe',
  subscribing: 'Subscribing...',
  success: 'Successfully subscribed!',
  error: 'Subscription failed.',
};

describe('NewsletterForm', () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it('renders correctly with dict', () => {
        render(<NewsletterForm dict={defaultDict} />);
        expect(screen.getByText('Join Newsletter')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
    });

    it('submits form successfully', async () => {
        const user = userEvent.setup();
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        render(<NewsletterForm dict={defaultDict} />);
        await user.type(screen.getByPlaceholderText('email@example.com'), 'test@example.com');
        
        await user.click(screen.getByRole('button', { name: 'Subscribe' }));

        await waitFor(() => {
            expect(screen.getByText('Successfully subscribed!')).toBeInTheDocument();
        });

        expect(mockFetch).toHaveBeenCalledWith('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com', lang: 'en' }),
        });
    });

    it('shows error on API failure', async () => {
        const user = userEvent.setup();
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Server error' }),
        });

        render(<NewsletterForm dict={defaultDict} />);
        await user.type(screen.getByPlaceholderText('email@example.com'), 'test@example.com');
        await user.click(screen.getByRole('button', { name: 'Subscribe' }));

        await waitFor(() => {
            expect(screen.getByText('Server error')).toBeInTheDocument();
        });
    });
});
