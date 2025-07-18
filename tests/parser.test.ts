import { describe, it, expect } from 'vitest';
import { NaturalLanguageParser } from '../src/generators/parser';

describe('NaturalLanguageParser', () => {
  const parser = new NaturalLanguageParser();

  describe('component type detection', () => {
    it('should detect button component', () => {
      const result = parser.parse('create a blue button');
      expect(result.componentType).toBe('button');
    });

    it('should detect pricing table component', () => {
      const result = parser.parse('create a pricing table with 3 tiers');
      expect(result.componentType).toBe('pricing-table');
    });

    it('should detect contact form component', () => {
      const result = parser.parse('create a contact form');
      expect(result.componentType).toBe('contact-form');
    });

    it('should detect modal component', () => {
      const result = parser.parse('create a modal dialog');
      expect(result.componentType).toBe('modal');
    });
  });

  describe('framework detection', () => {
    it('should detect React framework', () => {
      const result = parser.parse('create a React button');
      expect(result.framework).toBe('react');
    });

    it('should detect Vue framework', () => {
      const result = parser.parse('create a Vue button');
      expect(result.framework).toBe('vue');
    });

    it('should default to React', () => {
      const result = parser.parse('create a button');
      expect(result.framework).toBe('react');
    });
  });

  describe('styling system detection', () => {
    it('should detect Tailwind CSS', () => {
      const result = parser.parse('create a button with Tailwind');
      expect(result.styling).toBe('tailwind');
    });

    it('should detect styled-components', () => {
      const result = parser.parse('create a button with styled-components');
      expect(result.styling).toBe('styled-components');
    });

    it('should default to Tailwind', () => {
      const result = parser.parse('create a button');
      expect(result.styling).toBe('tailwind');
    });
  });

  describe('feature extraction', () => {
    it('should extract responsive feature', () => {
      const result = parser.parse('create a responsive button');
      expect(result.features).toContain('responsive');
    });

    it('should extract accessibility feature', () => {
      const result = parser.parse('create an accessible button');
      expect(result.features).toContain('accessibility');
    });

    it('should extract loading state feature', () => {
      const result = parser.parse('create a button with loading spinner');
      expect(result.features).toContain('loading-state');
    });
  });

  describe('constraint extraction', () => {
    it('should extract color constraints', () => {
      const result = parser.parse('create a red button');
      expect(result.constraints).toContain('color:red');
    });

    it('should extract size constraints', () => {
      const result = parser.parse('create a large button');
      expect(result.constraints).toContain('size:large');
    });

    it('should extract style constraints', () => {
      const result = parser.parse('create a minimal button');
      expect(result.constraints).toContain('style:minimal');
    });
  });

  describe('confidence scoring', () => {
    it('should have high confidence for clear descriptions', () => {
      const result = parser.parse('create a blue button with hover effects');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should have lower confidence for vague descriptions', () => {
      const result = parser.parse('create something');
      expect(result.confidence).toBeLessThan(0.7);
    });
  });

  describe('utility methods', () => {
    it('should extract variant hints', () => {
      const hint = parser.extractVariantHint('create a simple button');
      expect(hint).toBe('basic');
    });

    it('should extract quantities', () => {
      const quantity = parser.extractQuantity('create a pricing table with 3 tiers');
      expect(quantity).toBe(3);
    });

    it('should extract comparisons', () => {
      const comparison = parser.extractComparison('create a button like Stripe');
      expect(comparison).toBe('Stripe');
    });
  });
});