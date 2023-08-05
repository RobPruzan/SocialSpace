// may need
import { io } from 'socket.io-client';
export type IO = ReturnType<typeof io>;
import { useAppDispatch } from '@/redux/store';

type SecondParam<T> = T extends (arg1: any, arg2: infer P) => any ? P : T;
type OnCB = SecondParam<ReturnType<typeof io>['on']>;

export class SocketIO {
  socket: IO | null;

  constructor(url: string) {
    this.socket = null;
  }
}

// #TODO make this an env var
export const socketManager = new SocketIO('http://localhost:8080');
