import readline from "readline";
import { ParkingArea } from "./park.js";

let myParkingArea = new ParkingArea(5);

let prompt =
  "\n MENU \n[M] - map \n[P] - park \n[R] - remove \n[X] - exit  \n:  ";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt,
});

readLine.prompt();

readLine
  .on("line", (line) => {
    switch (line.trim()) {
      case "M":
        myParkingArea.viewArea();
        break;
      case "P":
        readLine.question(
          "\nCar Size \n[0] - Small \n[1] - Medium \n[2] - Large \n:   ",
          function (size) {
            let entrnce = myParkingArea.Park_Way.map((e) => e.name).join(
              " || "
            );
            readLine.question(
              `Entrance are \n${entrnce}  :    `,
              function (entrance) {
                myParkingArea.parkCar(entrance, size);
                readLine.prompt();
              }
            );
          }
        );

        break;

      case "R":
        readLine.question("Location of the Car : ", function (loc) {
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
        readLine.close();
        break;
      default:
        break;
    }
    readLine.prompt();
  })
  .on("close", () => {
    console.error("\n\nSYSTEM SHUTDOWN!\n\n");
    process.exit(0);
  });

readLine.on("close", function () {
  console.log("\n\nSYSTEM SHUTDOWN!\n\n");
  process.exit(0);
});
