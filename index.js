import readline from "readline";
import { ParkingArea } from "./park.js";

let myParkingArea = new ParkingArea(5);

let prompt =
  "\n MENU \n[M] - map \n[P] - park \n[R] - remove \n[X] - exit  \n:  ";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt,
});

rl.prompt();

rl.on("line", (line) => {
  switch (line.trim()) {
    case "M":
      myParkingArea.viewArea();
      break;
    case "P":
      rl.question(
        "\nCar Size \n[0] - Small \n[1] - Medium \n[2] - Large \n:   ",
        function (size) {
          let entrnce = myParkingArea.Park_Way.map((e) => e.name).join(" || ");
          rl.question(`Entrance are \n${entrnce}  :    `, function (entrance) {
            myParkingArea.parkCar(entrance, size);
            rl.prompt();
          });
        }
      );

      break;

    case "R":
      rl.question("Location of the Car : ", function (loc) {
        let location = loc.trim().split(" ");

        if (location.length >= 2) {
          let row = location[0];
          let col = location[1];
          myParkingArea.removeCar(row, col);
          console.log("\nCar Removed!\n");
        }
      });
      break;

    case "X":
      rl.close();
      break;
    default:
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.error("\n\nSYSTEM SHUTDOWN!\n\n");
  process.exit(0);
});

rl.on("close", function () {
  console.log("\n\nSYSTEM SHUTDOWN!\n\n");
  process.exit(0);
});
