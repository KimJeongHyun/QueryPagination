# QueryPagination

Pagination Component, controlled by URLSearchParams.

## Stacks

React v18 + rollup + Typescript + Storybook

## Peer Dependencies

* react v18.2.0
* react-dom v18.2.0


### Use-Cases

* Default

```
import { QueryPagination } from 'query-pagination';

function App(){
    return (
        <QueryPagination totalPages={5} />
    )
}

```

https://github.com/KimJeongHyun/QueryPagination/assets/23470125/36b19830-e3c2-4946-ab63-8e9d862237db

---

* Custom Use-Case 

```
import { QueryPagination } from 'query-pagination';

function App(){
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
        />
    )
}
```

https://github.com/KimJeongHyun/QueryPagination/assets/23470125/559f76d0-f245-4a90-a301-c1c7b08b41a6

---

