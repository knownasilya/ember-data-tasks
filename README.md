# ember-data-tasks

An alternative Ember Data store that returns [Ember Concurrency] tasks instead of promises.

## Install

```sh
ember install ember-data-tasks
```

## Setup

Override your existing store, by creating a new store:

```sh
ember g service store
```

Open `app/services/store.js` and modify it to:

```js
import Store from 'ember-data-tasks/services/store';

export default Store;
```

## Use

Now you can use your Ember Data like before, and nothing has changed, since this
store is backwards compatible, due to the fact that `tasks` also adhear to the promise spec.

But you didn't come here for the same old, you want immediate results.
To take advantage of the benefits of tasks, you will have to wrap your store responses in a hash.

The example below will hit `afterModel` after the backend has resolved with data:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post');
  }
});
```

But if you want immediate responses, do the following, and `afterModel` will
be hit immediately:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      postsTask: this.store.findAll('post')
    };
  }
});
```

Then you can utilize the `task` in your template like so:

```hbs
<ul>
  {{#if model.postsTask.isRunning}}
    Loading your posts..
  {{else}}
    {{#each model.postsTask.value as |post|}}
      <li>{{post.name}}</li>
    {{/each}}
  {{/if}}
</ul>
```

This seems like a slight annoyance at first, due to the extra level of nesting, but
in the end if you build ambitious apps, you will most likely return multiple
tasks, and would have used `Ember.RSVP.hash` anyway, if working with promises.

**Note: You can unwrap the task hash in `setupController`, if it really bothers you.**

[Ember Concurrency]: http://ember-concurrency.com
