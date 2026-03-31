import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

const defaultDict = {
  title: 'Send Message',
  name: 'Name',
  email: 'Email',
  message: 'Message',
  namePlaceholder: 'Your name',
  emailPlaceholder: 'your@email.com',
  messagePlaceholder: 'Your message...',
  submit: 'Send',
  sending: 'Sending...',
  success: 'Message sent!',
  error: 'Error sending message.',
};

describe('ContactForm', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders form fields', () => {
    render(<ContactForm dict={defaultDict} />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your message...')).toBeInTheDocument();
  });

  it('renders with default labels when no dict provided', () => {
    render(<ContactForm />);
    expect(screen.getByRole('heading', { name: 'SEND MESSAGE' })).toBeInTheDocument();
  });

  it('submits form and shows success', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm dict={defaultDict} />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test Name');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@email.com');
    await user.type(screen.getByPlaceholderText('Your message...'), 'Hello there');

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Message sent!')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Name',
        email: 'test@email.com',
        message: 'Hello there',
      }),
    });
  });

  it('shows error on API failure', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });

    render(<ContactForm dict={defaultDict} />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Your message...'), 'Hello');

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Error sending message.')).toBeInTheDocument();
    });
  });

  it('shows network error on fetch failure', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<ContactForm dict={defaultDict} />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Your message...'), 'Hello');

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Error sending message.')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise(resolve => { resolvePromise = resolve; });
    mockFetch.mockReturnValueOnce(promise);

    render(<ContactForm dict={defaultDict} />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Your message...'), 'Hello');

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    // Resolve the promise to clean up
    resolvePromise!({ ok: true, json: async () => ({ success: true }) });
  });
});
