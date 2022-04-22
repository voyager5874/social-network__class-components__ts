import { EffectCallback, useEffect, useState } from 'react';

export function useEffectAllDepsChange(fn: EffectCallback, deps: Array<any>) {
  const [changeTarget, setChangeTarget] = useState(deps);

  useEffect(() => {
    setChangeTarget(prev => {
      if (prev.every((dep, i) => dep !== deps[i])) {
        return deps;
      }

      return prev;
    });
  }, [deps]);

  useEffect(fn, changeTarget);
}
