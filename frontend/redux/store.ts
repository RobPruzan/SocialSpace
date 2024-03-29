// redux create toolkit store
import { Middleware, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { SocketIO, socketManager } from './socket';
import { exploreSlice } from './slices/challengeSlice';
import { socialSlice } from './slices/socialSlice';
import { userSlice } from './slices/userSlice';
export type SocketAction = { type: string; payload: any; meta: Meta };
type Meta = {};
export function withMeta<TPayload, TState>(
  reducer: (
    state: TState,
    action: PayloadAction<TPayload, string, Meta | undefined>
  ) => void
) {
  return {
    reducer,
    prepare: (payload: TPayload, meta?: Meta) => ({ payload, meta }),
  };
}

export const socketMiddleware =
  (socketManager: SocketIO): Middleware<{}, any> =>
  ({
    dispatch,
    getState,
  }: {
    dispatch: typeof store.dispatch;
    getState: typeof store.getState;
  }) =>
  (next) =>
  (action: SocketAction & { meta: Meta | undefined }) => {
    next(action);
  };

const indexDBMiddleware =
  (): Middleware<{}, any> =>
  ({
    dispatch,
    getState,
  }: {
    dispatch: typeof store.dispatch;
    getState: typeof store.getState;
  }) =>
  (next) =>
  (action: SocketAction & { meta: Meta | undefined }) => {
    next(action);
  };

export const store = configureStore({
  reducer: {
    explore: exploreSlice.reducer,
    social: socialSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware(socketManager))
      .concat(indexDBMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
