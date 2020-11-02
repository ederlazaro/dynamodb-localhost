import Service from "./create-table";
import Data from "./load-data";

const service = new Service();
const data = new Data();

service.deleteTable().then(function () {
  service.createTable().then(function () {
    service.putItems(data.items()).then(function () {
      console.log("Setup done!!!");
    });
  });
});
