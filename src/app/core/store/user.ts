import { effect, inject, Injectable } from '@angular/core';
import { User } from '@model/user';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { exhaustMap, pipe, tap } from 'rxjs';
import { DataService } from '../http/Data.service';
import { Router } from '@angular/router';
type UserState = {
  data: User[];
  isLoading: boolean;
  userSelected: User | null;
};
const initialState: UserState = {
  data: [],
  isLoading: false,
  userSelected: null,
};
@Injectable({ providedIn: 'root' })
export class UserStore {
  #state = signalState(initialState);
  #dataService = inject(DataService);
  #router = inject(Router);
  eff = effect(() => console.log('userState', this.#state()));
  // variable singnal
  readonly data = this.#state.data;
  readonly isLoading = this.#state.isLoading;
  readonly userSelected = this.#state.userSelected;
  // rxjs method
  readonly fetchData = rxMethod<void>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap(() => {
        return this.#dataService.get().pipe(
          tapResponse({
            next: (res) => patchState(this.#state, { data: res }),
            error: console.error,
            complete: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );
  readonly fetchDataById = rxMethod<string>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap((id: string) => {
        return this.#dataService.findById(id).pipe(
          tapResponse({
            next: (res) => patchState(this.#state, { userSelected: res }),
            error: console.error,
            complete: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );
  readonly createUser = rxMethod<User>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap((user: User) => {
        return this.#dataService.create(user).pipe(
          tapResponse({
            next: (res) => this.#router.navigateByUrl(`list`),
            error: console.error,
            complete: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );
  readonly updateUser = rxMethod<User & { id: string }>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap((user: User & { id: string }) => {
        return this.#dataService.update(user, user.id).pipe(
          tapResponse({
            next: (res) => this.#router.navigateByUrl(`list`),
            error: console.error,
            complete: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );
  readonly deleteUser = rxMethod<string>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap((id: string) => {
        return this.#dataService.delete(id).pipe(
          tapResponse({
            next: (res) => this.fetchData(),
            error: console.error,
            complete: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );
}
