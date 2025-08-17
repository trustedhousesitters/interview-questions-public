import { describe, it, expect } from 'vitest';
import {
  normalizeType,
  resolveCategory,
  svgForType,
  categorizePets,
  CATEGORY_TO_SVG,
} from './utils';

describe('normalizeType', () => {
  it('lowercases, trims, and collapses spaces', () => {
    expect(normalizeType('   DoG   ')).toBe('dog');
    expect(normalizeType('Guinea    Pig')).toBe('guinea pig');
  });

  it('naively singularizes trailing "s"', () => {
    expect(normalizeType('dogs')).toBe('dog');
    expect(normalizeType('Cats')).toBe('cat');
    expect(normalizeType('boss')).toBe('bos');
  });
});

describe('resolveCategory', () => {
  it('maps direct known animals', () => {
    expect(resolveCategory('dog')).toBe('dog');
    expect(resolveCategory('Cat')).toBe('cat');
    expect(resolveCategory('HORSE')).toBe('horse');
    expect(resolveCategory('duck')).toBe('poultry');
    expect(resolveCategory('snake')).toBe('reptile');
    expect(resolveCategory('Antelope')).toBe('farm animal');
  });

  it('handles aliases/special cases', () => {
    expect(resolveCategory('rock')).toBe('small pet');       // rock -> pet rock -> small pet
    expect(resolveCategory('Rock Hyrax')).toBe('small pet'); // rock hyrax -> hyrax -> small pet
    expect(resolveCategory('bunny')).toBe('small pet');      // bunny -> rabbit -> small pet
  });

  it('falls back to "small pet" by default', () => {
    expect(resolveCategory('unknown-critter')).toBe('small pet');
  });

  it('respects a custom fallback', () => {
    expect(resolveCategory('unknown-critter', 'dog')).toBe('dog');
  });
});

describe('svgForType', () => {
  it('returns the matching SVG module for known types', () => {
    expect(svgForType('dog')).toBe(CATEGORY_TO_SVG['dog']);
    expect(svgForType('Cat')).toBe(CATEGORY_TO_SVG['cat']);
    expect(svgForType('DUCK')).toBe(CATEGORY_TO_SVG['poultry']);
  });

  it('returns fallback category SVG when unknown', () => {
    const icon = svgForType('mystery', 'dog');
    expect(icon).toBe(CATEGORY_TO_SVG['dog']);
  });
});

describe('categorizePets', () => {
  it('enriches pets with category and icon while preserving fields', () => {
    const pets = [
      { id: 1, name: 'Fluffy', type: 'cat', feeds: 2 },
      { id: 2, name: 'Spot', type: 'dog', feeds: 3 },
      { id: 3, name: 'Quackers', type: 'duck', feeds: 1 },
      { id: 4, name: 'Mystery', type: 'unknown', feeds: 1 },
      { id: 5, name: 'Pep', type: 'Guinea   Pig', feeds: 2 },
    ];
    const enriched = categorizePets(pets);

    // preserved original fields
    expect(enriched[0]).toMatchObject({ id: 1, name: 'Fluffy', type: 'cat', feeds: 2 });

    // categories
    expect(enriched.find(p => p.name === 'Fluffy')?.category).toBe('cat');
    expect(enriched.find(p => p.name === 'Spot')?.category).toBe('dog');
    expect(enriched.find(p => p.name === 'Quackers')?.category).toBe('poultry');
    expect(enriched.find(p => p.name === 'Mystery')?.category).toBe('small pet'); // default fallback
    expect(enriched.find(p => p.name === 'Pep')?.category).toBe('small pet'); 

    for (const p of enriched) {
      expect(p.icon).toBe(CATEGORY_TO_SVG[p.category]);
    }
  });

  it('uses provided fallback category for unknown types', () => {
    const enriched = categorizePets([{ id: 99, name: 'X', type: '???' }], 'dog');
    expect(enriched[0].category).toBe('dog');
    expect(enriched[0].icon).toBe(CATEGORY_TO_SVG['dog']);
  });
});
