export function notImplementFn() {
  throw new Error("Not Implemented function");
}

export function notInitializedFn() {
  throw new Error("Not initialized function");
}

export async function notInitializedPromise() {
  throw new Error("Not initialized function");
}
/**
 * Instancie un debounce qui permet de se faire rappeler à la fin du timeout
 * si un autre call s'est exécuté alors le timeout est réinitialisé
 * et la fonction précédente sera annulée
 * @param handler
 * @param time
 */
export const createDebounce = <T extends (...args: any) => void>(
  handler: T,
  time: number
): { call: (...args: Parameters<T>) => void; abort: () => void } => {
  let timeoutId: number;
  return {
    call: (...args: Parameters<T>) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        handler.apply(null, args);
      }, time);
    },
    abort: () => {
      window.clearTimeout(timeoutId);
    },
  };
};

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}
