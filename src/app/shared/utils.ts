import { IClimber } from '../climber/climber';

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

  private static theUser: IClimber /*= { id: 1, firstName: "TEST", lastName: "USER", gender: "M" }*/;//TMP
  static setUser(user: IClimber) { Utils.theUser = user; }
  static getUser(): IClimber { return Utils.theUser; }
  static getUserId(): number { return Utils.theUser != null ? Utils.theUser.id : null; }

  static getApiUrl(apiName: string): string
  {
    return 'http://www.remranger.com/escalada-api/' + apiName + '.php';
  }
}
