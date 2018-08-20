import { allSettled } from 'ember-concurrency';

export default function notifyAfterLoad(hash, callback) {
  allSettled(Object.values(hash))
    .then(() => {
      callback(hash);
    });

  return hash;
}
