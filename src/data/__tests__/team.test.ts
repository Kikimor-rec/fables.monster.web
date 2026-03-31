import { describe, it, expect } from 'vitest';
import { teamMembers } from '../team';

describe('team data', () => {
  it('has team members defined', () => {
    expect(teamMembers.length).toBeGreaterThan(0);
  });

  it('all members have required fields', () => {
    for (const member of teamMembers) {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
    }
  });

  it('all members have unique names', () => {
    const names = teamMembers.map(m => m.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('links are valid URLs when present', () => {
    for (const member of teamMembers) {
      if (member.link) {
        expect(member.link).toMatch(/^https?:\/\//);
      }
    }
  });
});
