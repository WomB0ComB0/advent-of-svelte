import santa from '../lib/avatars/santa.svg?url';
import { User } from '../lib/User.svelte';

export const prerender = true;

export const load = () => {
  return {
    user: new User('Santa', 'Claus', santa)
  }
}