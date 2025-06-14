import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Character } from '../../../domain/entities/character';
import { CharacterListItem } from '../../../presentation/components/character-list-item';

const mockCharacter: Character = {
  id: 'abc123',
  name: 'Summer Smith',
  image: 'https://rick.com/summer.png',
  species: 'Human',
  status: 'Alive',
  gender: 'Female',
};

describe('CharacterListItem', () => {
  it('renders character name, species, and image', () => {
    render(
      <ul>
        <CharacterListItem character={mockCharacter} onClick={() => {}} />
      </ul>,
    );

    expect(screen.getByText('Summer Smith')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
  });

  it('renders green heart icon when isFavorite is true', () => {
    render(
      <ul>
        <CharacterListItem character={mockCharacter} isFavorite onClick={() => {}} />
      </ul>,
    );

    const icon = screen.getByTestId('favorite-icon');
    expect(icon).toHaveClass('fill-[#53C629]');
  });

  it('renders gray heart icon when isFavorite is false', () => {
    render(
      <ul>
        <CharacterListItem character={mockCharacter} isFavorite={false} onClick={() => {}} />
      </ul>,
    );

    const icon = screen.getByTestId('favorite-icon');
    expect(icon).toHaveClass('fill-[#D1D5DB]');
  });

  it('calls onClick with character when clicked', () => {
    const handleClick = vi.fn();

    render(
      <ul>
        <CharacterListItem character={mockCharacter} onClick={handleClick} />
      </ul>,
    );

    fireEvent.click(screen.getByTestId('character-list-item'));
    expect(handleClick).toHaveBeenCalledWith(mockCharacter);
  });

  it('applies selected background when selected is true', () => {
    render(
      <ul>
        <CharacterListItem character={mockCharacter} selected onClick={() => {}} />
      </ul>,
    );

    const item = screen.getByTestId('character-list-item');
    expect(item.className).toContain('bg-[#EEE3FF]');
  });
});
