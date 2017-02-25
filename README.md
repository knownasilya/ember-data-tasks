# ember-data-tasks

An alternative Ember Data store that returns [Ember Concurrency] tasks instead of promises.

## Install

```sh
ember install ember-data-tasks
```

This addon comes in three phases:

- [Phase 1: Store Override](#phase-1-store-override)
- [Phase 2: Model Override](#phase-2-model-override)
- Phase 3: Custom Endpoints, like ember-api-actions, but with tasks (coming soon).

## Phase 1: Store Override

By overriding the store with a mixin, we extend the behavior of methods on the store, like `store.findRecord('post', 1)`.

### Setup

Override your existing store, by creating a new store (or use your existing one, if you have it):

```sh
ember g service store
```

Open `app/services/store.js` and modify it to:

```js
import DS from 'ember-data';
import TaskStoreMixin from 'ember-data-tasks/mixins/task-store';

export default DS.Store.extend(TaskStoreMixin);
```

### Use

Now you can use your Ember Data store like before, and nothing has changed, since this
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

## Phase 2: Model Override

This phase allows you to enable tasks for methods like `model.save()`.

### Setup

Open `app/models/my-model.js` and modify it to:

```js
import DS from 'ember-data';
import TaskModelMixin from 'ember-data-tasks/mixins/task-model';

export default DS.Model.extend(TaskModelMixin, {
  // your model definition
});
```

You'd have to do this for every model, and if you have few, that should be easy.
For those that have many models, you can do the following:

Reopen the `DS.Model` in your `app/app.js` file.

```js
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
// Add these two imports
import DS from 'ember-data';
import TaskModelMixin from 'ember-data-tasks/mixins/task-model';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

// Add this model reopen
DS.model.reopen(TaskModelMixin);

export default App;
```

### Use

Now you can call `model.reload()`, `model.save()`, and `model.destroyRecord()` and get
tasks back instead of promises.

[Ember Concurrency]: http://ember-concurrency.com
