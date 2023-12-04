import fs from 'fs';
import { userDataDir } from 'appdirs';

class Database {
  private json: any;

  private path: string = userDataDir('CubeTimer', 'Thive-N');

  private jsonPath: string = `${this.path}/database.json`;

  private newTimes: { [key: string]: [string] } = {};

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

    if (!this.newTimes[session]) {
      this.newTimes[session] = [time];
    } else {
      this.newTimes[session].push(time);
    }
  }

  public async getBestSinceProgramStart(
    session: string = 'default',
  ): Promise<string> {
    if (!this.newTimes[session]) {
      return '0.00';
    }
    const times = this.newTimes[session];
    const best = times.reduce(
      (prev, curr) => (curr < prev ? curr : prev),
      times[0],
    );
    return best;
  }

  public async getTimes(session: string = 'default'): Promise<[any]> {
    if (!this.json[session]) {
      this.json[session] = [];
    }
    return this.json[session];
  }

  public async getSessions(): Promise<string[]> {
    return Object.keys(this.json);
  }

  public async addSession(session: string): Promise<void> {
    this.json[session] = [];
    this.save();
  }

  public static getCurrentTimestamp(): string {
    return new Date().toString();
  }
}

export default Database;
