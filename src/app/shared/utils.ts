export enum apiKind { read = "read", create = "create", update = "update", delete = "delete" }

export class Utils
{
  static getResultPic(result: number): string
  {
    switch (result)
    {
      case 0: return "result-fail.png";
      case 1: return "result-faults.png";
      case 2: return "result-success.png";
      default: return null;
    }
  }

  static getApiUrl(apiName: string, kind: apiKind ): string
  {
    return 'https://www.remranger.com/escalada-api/' + apiName + "-" + kind.toString() + '.php';
  }
}
