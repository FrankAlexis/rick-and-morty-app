import type {Character} from "../../domain/entities/character";
import type {CharacterRepository} from "../../domain/repositories/character-repository";
import {GET_CHARACTER_BY_ID, GET_CHARACTERS} from "../graphql/character-api";
import {client} from "../graphql/client";

export class CharacterRepositoryImpl implements CharacterRepository {
  async getCharacters(filters: Record<string, string>): Promise<Character[]> {
    const {data} = await client.query({
      query: GET_CHARACTERS,
      variables: {filter: filters},
    });
    return data.characters.results;
  }

  async getCharacterById(id: string): Promise<Character> {
    const {data} = await client.query({
      query: GET_CHARACTER_BY_ID,
      variables: {id},
    });
    return data.character;
  }
}
