import { FirstParameter, User } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';
import { withMeta } from '../store';

type State = { user: User | null };
type MetaParams<TPayload> = FirstParameter<typeof withMeta<TPayload, State>>;
const withUserMeta = <TPayload>(args: MetaParams<TPayload>) =>
  withMeta<TPayload, State>(args);

const initialState: State = { user: null };
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    addUser: withUserMeta<User>((state, action) => {
      state.user = action.payload;
    }),
  },
});

export const UserActions = userSlice.actions;
