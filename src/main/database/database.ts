import fs from 'fs';
import { userDataDir } from 'appdirs';

export class Database {
  private json: any;

  private path: string = userDataDir('CubeTimer', 'Thive-N');

  constructor() {
    this.load();
  }

  public async load(): Promise<void> {
    // if file doesnt exist create json file
    if (!fs.existsSync(this.path)) {
      this.json = {};
      this.save();
    }
    const data = fs.readFileSync(this.path);
    this.json = JSON.parse(data.toString());
  }

  public async save(): Promise<void> {
    const raw = JSON.stringify(this.json);
    fs.writeFileSync(this.path, raw);
  }

  public async addTime(
    time: string,
    session: string = 'default',
    delay: number = 0,
  ): Promise<void> {
    if (!this.json[session]) {
      this.json[session] = [];
    }
    this.json[session].push({
      timestamp: Database.getCurrentTimestamp(),
      time,
      delay,
    });
    this.save();
  }

  public static getCurrentTimestamp(): string {
    return Date.now().toString();
  }
}

export default Database;
