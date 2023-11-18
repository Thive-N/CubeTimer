import fs from 'fs';
import { userDataDir } from 'appdirs';

export class Database {
  private json: any;

  private path: string = userDataDir('CubeTimer', 'Thive-N');

  private jsonPath: string = `${this.path}/database.json`;

  constructor() {
    this.load();
  }

  public async load(): Promise<void> {
    // if directory doesnt exist create directory
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    // if file doesnt exist create json file
    if (!fs.existsSync(this.jsonPath)) {
      this.json = {};
      this.save();
    }
    const data = fs.readFileSync(this.jsonPath);
    this.json = JSON.parse(data.toString());
  }

  public async save(): Promise<void> {
    const raw = JSON.stringify(this.json, null, 2);
    fs.writeFileSync(this.jsonPath, raw);
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

  public async getTimes(session: string = 'default'): Promise<[string]> {
    if (!this.json[session]) {
      this.json[session] = [];
    }
    return this.json[session];
  }

  public static getCurrentTimestamp(): string {
    return Date.now().toString();
  }
}

export default Database;
