import {
  atom,
} from 'recoil';

export const usernameState = atom({
  key: 'usernameState',
  default: '',
});

export const passwordState = atom({
  key: 'passwordState',
  default: '',
});

export const emailState = atom({
  key: 'emailState',
  default: '',
});