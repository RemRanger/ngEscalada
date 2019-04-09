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
}
