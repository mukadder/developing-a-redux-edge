Like in previous example, I use expect and deep-freeze libraries from NPM to make my test assertions. This time, I'm testing a function called toggleTodo that takes our todo object and flips its completed field. If completed was false, it should be true in the return value. If it was true, it should be false.

const toggleTodo = (todo) => {

};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
Just like in the previous lesson, I'm going to start by writing a mutated version that passes the current test. A mutated version just flips the completed field, reassigns it on the past object.

const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};
While it works, we know that mutations are not allowed in Redux. So to enforce this, I'm calling deepFreeze on my todo object. I'm not allowed to change its completed field anymore.

One way out of this would be to create the new object with every field copied from the original object except the completed field, which would be flipped.

const toggleTodo = (todo) => {
  return {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  };
};
However, if we later add new properties to the new object, we might forget to update this piece of code to include them.

This is why I suggest you to use Object.assign method, which is new to ES6. It lets you assign properties of several objects onto the target object. Note how the object assign argument order corresponds to that of the JavaScript assignment operator.

const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};
The left argument is the one whose properties are going to be assigned, so it's going to be mutated. This is why we're passing an empty object as the first argument, so we don't mutate any existing data. Every further argument to Object.assign will be considered one of the source objects whose properties will be copied to the target object.

It is important that if several sources specify different values for the same property, the last one wins. This is what we use to override the completed field despite what the original todo object says.

Finally, you need to remember that Object.assign is a new method in ES6, so it is not natively available in all the browsers. You should use a polyfill, either the one that ships with Babel or a standalone Object.assign polyfill, to use it without risking crashing your website.

Another option that doesn't require a polyfill is to use the new object spread operator, which is not part of ES6. However, it is proposed for ES7. It is fairly popular, and it is enabled in Babel if you use the stage two preset.

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
  /*
 * Open the console to see
 * that the tests have passed.
 */

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };
  
  deepFreeze(todoBefore);
  
  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');