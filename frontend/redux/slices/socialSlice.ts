import { FirstParameter, User } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';
import { withMeta } from '../store';

export type Chat = {
  id: string;
  fromID: User['id'];
  message: string;
  timeCreated: number;
};

export type Post = {
  id: string;
  fromID: User['id'];
  img: string | null;
  title: string;
  content: string;
};

type State = {
  chats: Array<Chat>;
  posts: Array<Post>;
};

type MetaParams<TPayload> = FirstParameter<typeof withMeta<TPayload, State>>;
const withSocialMeta = <TPayload>(args: MetaParams<TPayload>) =>
  withMeta<TPayload, State>(args);

const initialState: State = {
  chats: [],
  posts: [],
};
export const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    addChat: withSocialMeta<Chat>((state, action) => {
      state.chats.push(action.payload);
    }),
    addPost: withSocialMeta<Post>((state, action) => {
      state.posts.push(action.payload);
    }),
  },
});

export const SocialActions = socialSlice.actions;
