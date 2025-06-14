import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAppState } from '../../../infrastructure/store/appState';
import { FilterPanel } from '../../../presentation/components/filter-panel';

vi.mock('../../../infrastructure/store/appState', async () => {
  const actual = await vi.importActual<typeof import('../../../infrastructure/store/appState')>(
    '../../../infrastructure/store/appState',
  );

  return {
    ...actual,
    useAppState: vi.fn(),
  };
});

const mockSetFilter = vi.fn();

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useAppState as any).mockReturnValue({
    filters: {
      search: '',
      character: '',
      species: '',
    },
    setFilter: mockSetFilter,
  });
  mockSetFilter.mockClear();
});

describe('FilterPanel', () => {
  it('renders input with placeholder', () => {
    render(<FilterPanel />);
    const input = screen.getByPlaceholderText('Search or filter results');
    expect(input).toBeInTheDocument();
  });

  it('calls setFilter when typing in search', () => {
    render(<FilterPanel />);
    const input = screen.getByPlaceholderText('Search or filter results');
    fireEvent.change(input, { target: { value: 'rick' } });
    expect(mockSetFilter).toHaveBeenCalledWith('search', 'rick');
  });

  it('toggles filter panel when clicking settings button', () => {
    render(<FilterPanel />);
    const toggleButton = screen.getByRole('button', { name: '' }); // icon button
    fireEvent.click(toggleButton);
    expect(screen.getByText('Character')).toBeInTheDocument();
    expect(screen.getByText('Specie')).toBeInTheDocument();
  });

  it('disables filter button if no filters are selected', () => {
    render(<FilterPanel />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
    const filterButton = screen.getByText('Filter');
    expect(filterButton).toBeDisabled();
  });

  it('calls setFilter when applying filters', () => {
    render(<FilterPanel />);
    fireEvent.click(screen.getByRole('button', { name: '' })); // open panel

    const humanButton = screen.getByRole('button', { name: 'Human' });
    fireEvent.click(humanButton);

    const starredButton = screen.getByRole('button', { name: 'Starred' });
    fireEvent.click(starredButton);

    const applyButton = screen.getByText('Filter');
    fireEvent.click(applyButton);

    expect(mockSetFilter).toHaveBeenCalledWith('character', 'Starred');
    expect(mockSetFilter).toHaveBeenCalledWith('species', 'Human');
  });
});
