export class OrderedEnum {
  static of<T extends object>(obj: T) {
    const values = Object.values(obj);
    const map = new Map(values.map((k, i) => [k, values[i + 1]]));

    return {
      next: <K extends keyof T>(v: T[K]) => map.get(v),
    };
  }
}
