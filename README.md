# QueryPagination

Pagination Component, controlled by URLSearchParams.

## Stacks

React v18 + rollup + Typescript + Storybook

## Peer Dependencies

- react
- react-dom
- react-router-dom v5
- sass

### Use-Cases

- Default

```
import { QueryPagination } from 'query-pagination';
import { useHistory } from 'react-router-dom'

function App(){

    return (
        <QueryPagination totalPages={5} history={history}/>
    )
}

```

https://github.com/KimJeongHyun/QueryPagination/assets/23470125/36b19830-e3c2-4946-ab63-8e9d862237db

---

- Custom Use-Case

```
import { QueryPagination } from 'query-pagination';
import { useHistory } from 'react-router-dom'

function App(){
    const history = useHistory();

    return (
        <QueryPagination
          totalPages={15}
          sliceSize={10}
          styles={
            wrapperBgColor: "#eee",
            selectedColor: {
              bgColor: "#5179a4",
              fontColor: "#fff",
            }}
          }
          history={history}

        />
    )
}
```

https://github.com/KimJeongHyun/QueryPagination/assets/23470125/559f76d0-f245-4a90-a301-c1c7b08b41a6

---
