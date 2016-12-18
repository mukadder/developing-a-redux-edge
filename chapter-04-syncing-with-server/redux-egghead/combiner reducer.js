In the previous lesson, we learned to use the combineReducer function, which comes with Redux and generates one reducer from several other reducers, delegating to them paths of the state tree.

const { combineReducer } = Redux;
const todoApp = combineReducer({
  todos,
  visibilityFilter
});
To gain a deeper understanding of how exactly combinedReducers works, we will implement it from scratch in this lesson.

CombineReducers is a function, so I'm writing a function declaration. Its only argument is the mapping between the state keys and the reducers, so I'm just going to call it reducers.

const combineReducer = (reducers) => {

};
The return value is supposed to be a reducer itself, so this is a function that returns another function. The signature of the return function is a reducer signature. It has the state and the action.

const combineReducer = (reducers) => {
  return (state = {}, action) => {

  };
};
Now, I'm calling the Object.keys method, which gives me all the keys of the reducer's object. In our example, this is todos and the visibilityFilter.

Next, I'm calling the reduce method on the keys, because I want to produce a single value, such as the nextState, by accumulating over every reducer key and calling the corresponding reducer. Each reducer passed through the combineReducers function is only responsible for updating a part of the state. This is why I'm saying that the nextState by the given key can be calculated by calling the corresponding reducer by the given key with the current state by the given key and the action.

const combineReducer = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};
The array reduce wants me to return the next accumulated value from the call back, so I'm returning the nextState. I'm also specifying an empty object as the initial next state, before all the keys are processed.

There we have it. This is a working reimplementation of combinedReducers utility from Redux.

Let's briefly recap how it works. I'm calling combinedReducers with an object whose values are the reducer functions and keys are the state field they manage.

const todoApp = combineReducer({
  todos,
  visibilityFilter
});
Inside the generated reducer, I'm retrieving all the keys of the reducers I passed to combineReducers, which is an array of strings, todos and visibilityFilter.

const combineReducer = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};
I'm starting with an empty object for my next state and I'm using the reduce operation of these keys to fill it gradually.

Notice that I'm mutating the next state object on every iteration. This is not a problem, because it is the object I created inside the reducer. It is not something passed from outside, so reducer stays a pure function.

To calculate the next state for a given key, it calls the corresponding reducer function, such as todos or visibilityFilter.

(nextState, key) => {
  nextState[key] = reducers[key](
    state[key],
    action
  );
  return nextState;
}
The generated reducer will pass through the child reducer only if part of its state by the key. If its state is a single object, it's only going to pass the relevant part, such as todos or visibility filter, depending on the current key, and save the result in the next state by the same key.

Finally, we use the array reduce operation with the empty object as the initial next state, that is being filled on every iteration until it is the return value of the whole reduce operation.

In this lesson, you learned how to implement the combinedReducers utility that comes with Redux from scratch.

It is not essential to use in Redux, so it is fine if you don't fully understand how it works yet. However, it is a good idea to practice functional programming and understand functions can take other functions as arguments and return other functions, because knowing this will help you get more productive in Redux in the long term.
/*
 * Open the console
 * to see the state log.
 */

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go shopping'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');