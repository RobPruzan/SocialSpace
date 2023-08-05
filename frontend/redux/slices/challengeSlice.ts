import { createSlice } from '@reduxjs/toolkit';
import { withMeta } from '../store';
import { FirstParameter, Rectangle, User } from '@/lib/types';
import { Chat, Post } from './socialSlice';

export type Challenge = {
  id: string;
  cords: Rectangle;
  img: string;
  name: string;
  description: string;
  userIds: Array<User['id']>;
  targetPoints: number;
  currentPoints: number;
  chatIds: Array<Chat['id']>;
  postIds: Array<Post['id']>;
};

export const buildInitialChallenge = (
  initial?: Partial<Challenge>
): Challenge => ({
  chatIds: [],
  cords: {
    p1: [0, 0],
    p2: [50, 50],
  },
  currentPoints: 0,
  targetPoints: 0,
  description: '',
  id: crypto.randomUUID(),
  img: '',
  name: 'Untitled',
  postIds: [],
  userIds: [],
  ...initial,
});
type State = {
  challenges: Array<Challenge>;
};
const initialState: State = {
  challenges: [],
};
type MetaParams<TPayload> = FirstParameter<typeof withMeta<TPayload, State>>;
const withChallengeMeta = <TPayload>(args: MetaParams<TPayload>) =>
  withMeta<TPayload, State>(args);

export const exploreSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    addChallenge: withChallengeMeta<Challenge>((state, action) => {
      state.challenges.push(action.payload);
    }),
  },
});

export const ExploreActions = exploreSlice.actions;
