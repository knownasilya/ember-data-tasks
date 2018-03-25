import { waitForProperty } from 'ember-concurrency';

export default async function notifyAfterLoad(hash, callback) {
  await waitForProperty(
    Object.values(hash),
    'state',
    'finished',
  );

  callback(hash);

  return hash;
};
