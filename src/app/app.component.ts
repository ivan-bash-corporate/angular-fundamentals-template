import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest, debounceTime, distinctUntilChanged,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: any): void {
    const inputValue: string = element.target.value;
    this.searchTermByCharacters.next(inputValue);
  }

  initCharacterEvents(): void {
    this.charactersResults$ = this.searchTermByCharacters
        .pipe(
            filter((term) => term.length >= 3),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term) => this.mockDataService.getCharacters(term)),
        );
  }

    loadCharactersAndPlanet(): void {
      this.planetAndCharactersResults$ = forkJoin({
        characters: this.mockDataService.getCharacters(),
        planets: this.mockDataService.getPlanets()
      }).pipe(
          map(({ characters, planets }) => {return [...characters, ...planets];}),
      );
    }

  initLoadingState(): void {
    const loadingSubscription = combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader()
    ])
        .pipe(
            map((loaders) => this.areAllValuesTrue(loaders))
        )
        .subscribe((isLoading) => {
          this.isLoading = isLoading;
        });

    this.subscriptions.push(loadingSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
