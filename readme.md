A simple virtual DOM implementation

## include

- jsx
- functional component

## not include

- SyntheticEvent
- class component
- other React features

## usage

```typescript
import { createElement } from "../vdom/create-element";
import { mount } from "../vdom/mount";
import { render } from "../vdom/render";
import { diff } from "../vdom/diff";

const App = ({ count }: { count: string }) => (
  <ul className="aaa">
    <li>
      <span>
        <strong>{count}</strong>
      </span>
    </li>
    <li>{count}</li>
    <li>
      <input />
    </li>
    <li>
      <span>
        <strong>345</strong>
        <strong>{count}</strong>
      </span>
    </li>
  </ul>
);

let count = 1;
const root = document.getElementById("app");
let app = <App count={String(count)} />;
const $root = mount(render(app), root);

setInterval(() => {
  count++;
  const newApp = <App count={String(count)} />;
  const patch = diff(app, newApp);
  patch($root as HTMLElement);
  app = newApp;
}, 1000);
```

Inspired by the talk [Building a Simple Virtual DOM from Scratch - Jason Yu](https://www.youtube.com/watch?v=85gJMUEcnkc)
