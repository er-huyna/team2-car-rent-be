import { nanoid } from 'nanoid';

export class UltilCommon {
  async convertSnakeCaseToCamelCase(obj: Record<string, any>) {
    const camelCasedObj: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, match) =>
          match.toUpperCase(),
        );
        camelCasedObj[camelCaseKey] = obj[key];
      }
    }

    return camelCasedObj;
  }

  async convertCamelCaseToSnakeCase(obj: Record<string, any>) {
    const snakeCasedObj: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeCaseKey = key.replace(
          /[A-Z]/g,
          (match) => `_${match.toLowerCase()}`,
        );
        const firstChar = snakeCaseKey.charAt(0);
        const resultKey =
          firstChar === '_' ? snakeCaseKey.substr(1) : snakeCaseKey;

        snakeCasedObj[resultKey] = obj[key];
      }
    }

    return snakeCasedObj;
  }

  async generateNanoid(): Promise<string> {
    const nanoId: string = nanoid(12);
    return nanoId;
  }
}
