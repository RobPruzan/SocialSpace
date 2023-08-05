import { Challenge } from '@/redux/slices/challengeSlice';
import { Post, Chat } from '@/redux/slices/socialSlice';

export type Percentage = `${number}%`;
export type FirstParameter<T> = T extends (arg: infer R, ...rest: any[]) => any
  ? R
  : T;
export type Rectangle = {
  p1: [number, number];
  p2: [number, number];
};
export enum ViewObjects {
  Challenge = 'challenge',
}

export type TypedChallenge = {
  id: Challenge['id'];
  type: ViewObjects.Challenge;
};

export type User = {
  id: string;
  img: string;
  cords: [number, number];
  challengeIds: Array<Pick<Challenge, 'id'>>;
  postIds: Array<Pick<Post, 'id'>>;
  chatIds: Array<Pick<Chat, 'id'>>;
  username: string;
};
