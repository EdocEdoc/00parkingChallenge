import util from "util";

//class of the parking area
export class ParkingArea {
  constructor(numOfCarPerBlock) {
    this.Parking_Rows = 3;
    this.CarPerRow_Cols = numOfCarPerBlock;

    this.theParkingLot = new Array(this.Parking_Rows)
      .fill(null)
      .map(() => new Array(this.CarPerRow_Cols).fill(null));

    this.Park_Way = [
      { name: "A", row: 0, col: 0 },
      { name: "B", row: 1, col: 0 },
      { name: "C", row: this.Parking_Rows - 1, col: 0 },
    ];

    this.initParkSpaces();
  }

  viewArea() {
    console.log(
      util.inspect(this.theParkingLot, {
        showHidden: false,
        colors: true,
        compact: true,
        depth: null,
      })
    );
  }

  initParkSize() {
    const sizeLabel = ["SP", "MP", "LP"];
    const size = Math.round(Math.random() * (2 - 0) + 0);
    const desc = sizeLabel[size];
    return {
      value: size,
      desc: desc,
    };
  }

  initParkSpaces() {
    for (let i = 0; i < this.Parking_Rows; i++) {
      for (let j = 0; j < this.CarPerRow_Cols; j++) {
        this.theParkingLot[i][j] = {
          row: i,
          col: j,
          type: getType(i, j, this.Park_Way),
          withVehicle: false,
          size: this.initParkSize(),
        };
      }
    }
  }

  parkCar(entrance, carSize) {
    let rowNumber = -1;
    let colNumber = -1;
    let distance = 999999;
    let carEntrance = this.Park_Way.find((o) => o.name === entrance);

    for (let i = 0; i < this.Parking_Rows; i++) {
      for (let j = 0; j < this.CarPerRow_Cols; j++) {
        let p = this.theParkingLot[i][j];
        if (carSize <= p.size.value && p.type == "park space") {
          let computedDistance =
            Math.abs(carEntrance.row - p.row) +
            Math.abs(carEntrance.col - p.col);
          if (distance > computedDistance && !p.withVehicle) {
            distance = computedDistance;
            rowNumber = i;
            colNumber = j;
          }
        }
      }
    }

    if (rowNumber == -1) {
      console.error("\nNo available parking slot!\n");
      return false;
    } else {
      Object.assign(this.theParkingLot[rowNumber][colNumber], {
        withVehicle: true,
        carSize: {
          value: parseInt(carSize),
          desc: getCarSize(carSize),
        },
        row: rowNumber,
        col: colNumber,
        start: new Date(),
      });

      return this.theParkingLot[rowNumber][colNumber];
    }
  }

  removeCar(row, col) {
    let parked = this.theParkingLot[row][col];
    if (parked?.withVehicle) {
      let timeConsumed = new Date() - parked.start;
      let totalFee = calculateFee(parked.size.value, timeConsumed);

      console.log(`\nTotal fee for Parking: P ${totalFee}\n`);

      Object.assign(this.theParkingLot[row][col], {
        withVehicle: false,
        carSize: null,
        start: null,
      });
    } else {
      console.error("\nNo Car on that lot or no lot with that coordinates!\n");
    }
  }
}

const getType = (i, j, way) => {
  for (let k = 0; k < way.length; k++) {
    if (way[k].row == i && way[k].col == j) {
      return "entrance";
    }
  }

  return "park space";
};

const getCarSize = (size) => {
  switch (parseInt(size)) {
    case 0:
      return "S";
      break;
    case 1:
      return "M";
      break;
    case 2:
      return "L";
      break;
    default:
      return "";
  }
};

const calculateFee = (size, totalTime) => {
  let timeConsumed = totalTime;
  let wholeDay = 1000 * 60 * 24;
  let oneHour = 1000 * 60;
  let charges = 0;

  var hourlyCharge = 0;

  if (size == 0) {
    hourlyCharge = 20;
  } else if (size == 1) {
    hourlyCharge = 60;
  } else if (size == 2) {
    hourlyCharge = 100;
  }

  if (timeConsumed > wholeDay) {
    let n24 = parseInt(totalTime / wholeDay);
    charges += n24 * 5000;
    timeConsumed -= n24 * wholeDay;
  }

  if (timeConsumed > oneHour * 3) {
    timeConsumed -= oneHour * 3;
    charges += 40;
  }

  if (timeConsumed > 0) {
    let remainingHours = Math.ceil(timeConsumed / oneHour);
    charges += remainingHours * hourlyCharge;
  }

  return charges;
};
