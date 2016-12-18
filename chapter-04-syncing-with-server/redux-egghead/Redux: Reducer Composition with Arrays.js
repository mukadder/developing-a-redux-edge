In the previous lesson we created a reducer that can handle two actions, adding a new todo, and toggling an existing todo. Right now, the code to update the todo item or to create a new one is placed right inside of the todos reducer.

This function is hard to understand because it makes us two different concerns, how the todo's array is updated, and how individual todos are updated. This is not a problem unique to Redux. Any time a function does too many things, you want to extract other functions from it, and call them so that every function only addresses a single concern.

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
  }
};
In this case, I decided that creating and updating a todo in response to an action is a separate operation, and needs to be handled by a separate function called todo.

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
  }
}
As a matter of convention, I decided that it should also accept two arguments, the current state and the action being dispatched, and it should return the next state.

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ... };
    case 'TOGGLE_TODO':
      if (todo.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
  }
};
But in this case, this state refers to the individual todo, and not to the list of todos. Finally, there is no magic in Redux to make it work. We extracted the todo reducer from the todos reducer, so now we need to call it for every todo, and assemble the results into an array.

switch (action.type) {
  case 'ADD_TODO':
    return { ... };
  case 'TOGGLE_TODO':
    return stat.map(t => todo(t, action));
  default:
    return state;
}
While this is not required in this particular example, I suggest that you always have the default case where you return the current state to avoid all problems in the future. The pattern described in this lesson is pervasive in Redux's development, and is called reducer composition.

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ... };
    case 'TOGGLE_TODO':
      if (todo.id !== action.id) {
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
Different reducers specify how different parts of the state tree are updated in response to actions. Reducers are also normal JavaScript functions, so they can call other reducers to delegate and abstract a way of handling of updates of some parts of this tree they manage.

This pattern can be applied many times, and while there is still a single top level reducer managing the state of your app, you will find it convenient to express it as many reducers call on each other, each contribution to a part of the applications state tree.
/*
 * Open the console
 * to see that the tests pass.
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

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};


testAddTodo();
testToggleTodo();
console.log('All tests passed.');