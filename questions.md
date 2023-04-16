##### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

`PureComponent` have simple implementation of `shouldComponentUpdate` - shallow comparison of state and props.
It's help to avoid unnecessarily component re-render.
Under the normal use this shouldn't be a problem.
It can break app when you pass mutable object or array to children component.
In this case children component won't be re-rendered.

```
class Parent extends React.Component {
  state: { items: number[] } = {
    items: [],
  }
  
  counter = 0;
  
  addItem = () => {
    const {items} = this.state;
    items.push(this.counter++); // mutate array
    this.setState({items}); // call setState to force re-render
  }
  
  render() {
    return <>
      <button onClick={this.addItem}>add item</button>
      <Child items={this.state.items}/>
    </>;
  }
}

class Child extends React.PureComponent<{
  items: number[],
}> {
  render() {
    return this.props.items.map((item) => <div key={item}>{item}</div>)
  }
}
```

##### 2. Context + shouldComponentUpdate might be dangerous. Can think of why is that?

I guess in case when `this.context` is used in a React component, after context changes
React will trigger a re-render of the component without calling shouldComponentUpdate.

##### 3. Describe 3 ways to pass information from a component to its PARENT.

1. callback function
2. Context
3. state management libraries like redux, mobx

##### 4. Give 2 ways to prevent components from re-rendering.

1. `shouldComponentUpdate` for class components
2. `React.memo()`

##### 5. What is a fragment and why do we need it? Give an example where it might break my app.

`React.Fragment`(short syntax `<></>`) allow to group multiple element 
when we don't want to add additional element to the DOM.
Some libraries can use `React.cloneElement` to add some props to child elements
and in case when we wrap these elements to `React.Fragment` it break expected behaviour.
Because `React.Fragment` still part of the React tree.

```
function Test({country = 'us'}) {
  return <div>
    <div>select size</div>
    <Select value="s" onChange={() => {/*...*/}}>
      {country === 'us' 
        ? <>
          <Option value="s">s</Option>
          <Option value="m">m</Option>
        </> 
        : [
        <Option value="s">34</Option>,
        <Option value="m">36</Option>
        ]
      }
    </Select>
  </div>
}

funciton Select(props) {
  const childrenWithFocus = React.Children.map(children, child => {
    if (child.props.value === props.vaue) {
      return React.cloneElement(child, { ...child.props, isActive: true });
    }
    return child;
  });
  return childrenWithFocus;
}
```

##### 6. Give 3 examples of the HOC pattern.

1. `React.memo(Test)`
2. `connect()(Test)` from react-redux
3. I don't remember third HOC from common used libraries.
However, I believe that the `react-router` library should include some HOC
to pass URL parameters to props (e.g. `withRouter`).

#### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

```
function callbacFn(res, err) {
  if (err) {
    console.log(err);
  }
  //...
}

Promise.reject(new Error('mock err'))
  .catch((err) => {
    console.log(err)
  })
  
async function test() {
  try {
    throw new Error('mock error');
  } catch(err) {
    console.log(err);
  }
}
```

##### 8. How many arguments does setState take and why is it async.

`setState` takes two arguments, first argument - object or function
and second callback function that will be called when new state will be applied.
`setState` is async for performance purposes, it allows React to batch multiple `setState` calls
 to minimize the number of component re-renders.

##### 9. List the steps needed to migrate a Class to Function Component.

1. Replace render() method with the component's return value.
2. Move any state and lifecycle methods to React hooks, such as useState() and useEffect().
3. Replace this.props and this.state with the props and useState() hook.

##### 10. List a few ways styles can be used with components.

```
import Title from '../title.css'

function Test() {
 return <div styles={{backgroundColor: 'red'}}> // {1}
   <div className="title">Title</div> // {2}
 <div>
}
```

##### 11. How to render an HTML string coming from the server.

Use `dangerouslySetInnerHTML` prop, but you should be 100% sure about this html to avoid xss attacks  
