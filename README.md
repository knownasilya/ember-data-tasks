# ember-data-tasks

An alternative Ember Data store that returns [Ember Concurrency] tasks instead of promises.

## Install

```sh
ember install ember-data-tasks
```

## Usage

Override your existing store, by creating a new store:

```sh
ember g service store
```

Open `app/services/store.js` and modify it to:

```js
import Store from 'ember-data-tasks/services/store';

export default Store;
```

Now you can use your Ember Data like before, and nothing has changed.
But if you want immediate responses, you will have to wrap your store
responses in a hash.

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
    Loading..
  {{else}}
    {{#each model.postTask.value as |post|}}
      <li>{{post.name}}</li>
    {{/each}}
  {{/if}}
</ul>
```

This seems like a slight annoyance at first, due to the extra level of nesting, but
in the end if you build ambitious apps, you will most likely return multiple
tasks, and would have used `Ember.RSVP.hash` if working with promises.

**Note: You can unwrap the task hash in `setupController`, if it really bothers you.**

[Ember Concurrency]: http://ember-concurrency.com
