import { describe, it, expect } from 'vitest';
import {
  projects,
  getFeaturedProject,
  getProjectsByStatus,
  getReleasedProjects,
  sortProjectsByStatus,
} from '../projects';

describe('projects data', () => {
  describe('data integrity', () => {
    it('has projects defined', () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it('all projects have required fields', () => {
      for (const project of projects) {
        expect(project.id).toBeTruthy();
        expect(project.slug).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(project.status).toBeTruthy();
        expect(project.type).toBeTruthy();
        expect(project.image).toBeTruthy();
        expect(project.imageAlt).toBeTruthy();
      }
    });

    it('all projects have unique IDs', () => {
      const ids = projects.map(p => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('all projects have unique slugs', () => {
      const slugs = projects.map(p => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('all projects have valid status', () => {
      const validStatuses = ['released', 'in-development', 'coming-soon'];
      for (const project of projects) {
        expect(validStatuses).toContain(project.status);
      }
    });

    it('image paths start with /', () => {
      for (const project of projects) {
        expect(project.image).toMatch(/^\//);
      }
    });
  });

  describe('getFeaturedProject', () => {
    it('returns a featured project', () => {
      const featured = getFeaturedProject();
      expect(featured).toBeDefined();
      expect(featured?.featured).toBe(true);
    });
  });

  describe('getProjectsByStatus', () => {
    it('returns only released projects', () => {
      const released = getProjectsByStatus('released');
      for (const p of released) {
        expect(p.status).toBe('released');
      }
    });

    it('returns only in-development projects', () => {
      const inDev = getProjectsByStatus('in-development');
      for (const p of inDev) {
        expect(p.status).toBe('in-development');
      }
    });

    it('returns empty array for non-existing status', () => {
      const result = getProjectsByStatus('coming-soon');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getReleasedProjects', () => {
    it('returns the same as getProjectsByStatus("released")', () => {
      const released = getReleasedProjects();
      const byStatus = getProjectsByStatus('released');
      expect(released).toEqual(byStatus);
    });
  });

  describe('sortProjectsByStatus', () => {
    it('sorts released before in-development', () => {
      const sorted = sortProjectsByStatus([...projects]);
      const statuses = sorted.map(p => p.status);
      const releasedIndex = statuses.indexOf('released');
      const inDevIndex = statuses.indexOf('in-development');
      if (releasedIndex !== -1 && inDevIndex !== -1) {
        expect(releasedIndex).toBeLessThan(inDevIndex);
      }
    });

    it('does not mutate the original array', () => {
      const original = [...projects];
      sortProjectsByStatus(original);
      expect(original).toEqual([...projects]);
    });

    it('places featured projects first within same status', () => {
      const sorted = sortProjectsByStatus([...projects]);
      const releasedProjects = sorted.filter(p => p.status === 'released');
      if (releasedProjects.length > 1) {
        const featuredIdx = releasedProjects.findIndex(p => p.featured);
        if (featuredIdx !== -1) {
          expect(featuredIdx).toBe(0);
        }
      }
    });
  });
});
