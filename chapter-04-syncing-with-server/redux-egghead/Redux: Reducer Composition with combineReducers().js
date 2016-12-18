In the previous lesson we learned how to use the reducer composition pattern to let different reducers handle different parts of the state tree, and then combine their results.

This pattern is so common that it's present in most Redux applications. This is why Redux provides a function called combineReducers that lets you avoid writing this code by hand. Instead, it generates the top level reducer for you.

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
The only argument to combine reducers is an object. This object lets me specify the mapping between the state field names, and the reducers managing them. The return value of the combineReducer is called a Reducer function, which is pretty much equivalent to the reducer function I wrote by hand previously.

The keys of the object I configure combinedReducers with correspond to the fields that the state object is going to manage. The values of the object I have asked to combineReducer, are the producers we should call to update the correspondence state fields.

const todos = (state = [], action) => {
  switch (action.type) { ... }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) { ... }
};
This combineReducer call says that the todo's field inside the state object managers will be updated by the todos reducer, and the visibilityFilter field inside the state object will be updated by calling the visibilityFilter reducer. The results will be assembled into a single object. In other words, it behaves pretty much exactly as the function commented down below.

//  const todoApp = (state = {}, action) => {
//    return {
//      todos: todos(
//       state.todos,
//        action
//     ),
//      visibilityFilter: visibilityFilter(
//        state.visibilityFilter,
//        action
//      )
//    };
//  };
Finally, I will establish a useful convention. I will always name my reducers after the state keys they manage. Since the key names and the value names are now the same, I can omit the values thanks to the ES6 object literal shorthand notation.

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
In this lesson, you learned how to generate a simple reducer that calls many reducers to manage parts of its state by using the combineReducers utility function.
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

const { combineReducers } = Redux;
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