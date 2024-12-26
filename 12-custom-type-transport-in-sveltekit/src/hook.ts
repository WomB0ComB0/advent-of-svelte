import { User } from './lib/User.svelte';

// ...and is then transported across the network 🤯

/** @type {import('@sveltejs/kit').Transport} */
export const transport = {
  User: {
    encode: (value: User) => {
      if (!(value instanceof User)) return false;
      return [value.firstName, value.lastName, value.avatar];
    },
    decode: ([firstName, lastName, avatar]: [typeof User.prototype.firstName, typeof User.prototype.lastName, typeof User.prototype.avatar]) => {
      return new User(firstName, lastName, avatar);
    },
  },
};
