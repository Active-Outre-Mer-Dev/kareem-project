export class Car {
  id: string;
  lastChecked: string;
  constructor(
    public model: string,
    public licensePlate: string,
    public passengers: number,
    public gas: "electric" | "gasoline",
    public gear: "automatic" | "manual"
  ) {
    this.model = model;
    this.licensePlate = licensePlate;
    this.passengers = passengers;
    this.gas = gas;
    this.gear = gear;
    this.id = crypto.randomUUID();
    this.lastChecked = new Date().toDateString();
  }
}

const tesla = new Car("Tesla Model S", "4053-AAC", 5, "electric", "automatic");
const nissan = new Car("Nissan Skyline", "4553-AAB", 4, "gasoline", "manual");

export const cars = [tesla, nissan];
