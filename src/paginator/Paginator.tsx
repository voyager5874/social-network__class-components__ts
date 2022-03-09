import { ComponentReturnType } from 'types';

export const Paginator = (): ComponentReturnType => {
  return (
    <div>
      <button>prev</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>next</button>
    </div>
  );
};
