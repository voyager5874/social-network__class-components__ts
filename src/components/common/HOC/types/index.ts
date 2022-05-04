import { useLocation } from 'react-router-dom';

// export type WithRouterPropsType = {
//   router: {
//     location: {
//       pathname: string;
//       search: string;
//       hash: string;
//       state: Nullable<string>;
//       key: string;
//     };
//     params: {
//       id: string;
//     };
//     navigate: (url: string) => void;
//   };
// };

type RouterLocationType = ReturnType<typeof useLocation>;

export type WithRouterPropsType = {
  router: {
    location: RouterLocationType;
    params: {
      id: string;
    };
    navigate: (url: string) => void;
  };
};
