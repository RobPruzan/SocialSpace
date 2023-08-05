import { createSlice } from '@reduxjs/toolkit';
import { withMeta } from '../store';
import { FirstParameter, Rectangle } from '@/lib/types';

type User = {
  id: string;
  img: string;
  cords: [number, number];
  challengeIds: Array<Pick<Challenge, 'id'>>;
  postIds: Array<Pick<Post, 'id'>>;
  chatIds: Array<Pick<Chat, 'id'>>;
  username: string;
};

type Chat = {
  id: string;
  user: User;
  message: string;
};

type Post = {
  id: string;
  img: string | null;
  title: string;
  content: string;
};

export type Challenge = {
  id: string;
  cords: Rectangle;
  img: string;
  name: string;
  description: string;
  userIds: Array<Pick<User, 'id'>>;
  targetPoints: number;
  currentPoints: number;
  chatIds: Array<Pick<Chat, 'id'>>;
  postIds: Array<Pick<Post, 'id'>>;
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
const withCanvasMeta = <TPayload>(args: MetaParams<TPayload>) =>
  withMeta<TPayload, State>(args);

export const exploreSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    addChallenge: withCanvasMeta<Challenge>((state, action) => {
      state.challenges.push(action.payload);
    }),
  },
});

export const ExploreActions = exploreSlice.actions;
