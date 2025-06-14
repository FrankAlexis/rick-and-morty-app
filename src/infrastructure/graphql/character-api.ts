import {gql} from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        name
        image
        species
        gender
        status
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      gender
      status
    }
  }
`;
