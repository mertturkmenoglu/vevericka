export type Stateful<T> = T extends object
  ? {
      [P in keyof T]: Readonly<[T[P], React.Dispatch<React.SetStateAction<T[P]>>]>;
    }
  : Readonly<[T, React.Dispatch<React.SetStateAction<T>>]>;
