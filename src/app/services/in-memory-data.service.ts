import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: "Black Panther", power: "Super Human" },
      { id: 2, name: "Iron Man", power: "Technology" },
      { id: 3, name: "Captain America", power: "Super Human" },
      { id: 4, name: "Thor", power: "God of Thunder" },
      { id: 5, name: "Hulk", power: "Super Strength" },
      { id: 6, name: "Black Widow", power: "Super Spy" },
      { id: 7, name: "Hawkeye", power: "Super Spy & Archery" },
      { id: 8, name: "Spiderman", power: "Spider Super Human" },
      { id: 9, name: "Dr. Strange", power: "Mystic Arts" }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

  constructor() { }
}
