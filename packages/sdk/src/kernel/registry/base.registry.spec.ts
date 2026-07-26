import { BaseRegistry } from './base.registry';
import { RegistryError } from '../../core/errors';

interface Item {
  id: string;
  label: string;
}

describe('BaseRegistry', () => {
  it('registers and retrieves an item', () => {
    const registry = new BaseRegistry<Item>();

    registry.register({ id: 'a', label: 'first' });

    expect(registry.get('a')).toEqual({ id: 'a', label: 'first' });
    expect(registry.has('a')).toBe(true);
  });

  it('throws RegistryError when registering a duplicate id', () => {
    const registry = new BaseRegistry<Item>();

    registry.register({ id: 'a', label: 'first' });

    expect(() =>
      registry.register({ id: 'a', label: 'second' })
    ).toThrow(RegistryError);

    // the original registration must be untouched
    expect(registry.get('a')).toEqual({ id: 'a', label: 'first' });
  });

  it('unregister removes an item and returns true', () => {
    const registry = new BaseRegistry<Item>();

    registry.register({ id: 'a', label: 'first' });

    expect(registry.unregister('a')).toBe(true);
    expect(registry.has('a')).toBe(false);
    expect(registry.get('a')).toBeUndefined();
  });

  it('unregister returns false for an id that was never registered', () => {
    const registry = new BaseRegistry<Item>();

    expect(registry.unregister('missing')).toBe(false);
  });

  it('allows re-registering the same id after unregistering it', () => {
    const registry = new BaseRegistry<Item>();

    registry.register({ id: 'a', label: 'first' });
    registry.unregister('a');
    registry.register({ id: 'a', label: 'second' });

    expect(registry.get('a')).toEqual({ id: 'a', label: 'second' });
  });

  it('list() returns all registered items', () => {
    const registry = new BaseRegistry<Item>();

    registry.register({ id: 'a', label: 'first' });
    registry.register({ id: 'b', label: 'second' });

    expect(registry.list()).toHaveLength(2);
  });
});
