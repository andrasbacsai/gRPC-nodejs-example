// Load dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Path to our proto file
const PROTO_FILE = "./service_def.proto";

// Options needed for loading Proto file
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// Load Proto File
const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
// Load Definition into gRPC
const dogProto = grpc.loadPackageDefinition(pkgDefs);
// Create gRPC server
const server = new grpc.Server();

// Implement DogService
server.addService(dogProto.DogService.service, {
  // Implment GetDog
  GetDog: (input, callback) => {
    try {
      callback(null, { name: "Spot", age: 5 });
    } catch (error) {
      callback(error, null);
    }
  },
});

// Start the Server
server.bindAsync(
  // Port to serve on
  "0.0.0.0:3000",
  // authentication settings
//   grpc.ServerCredentials.createInSecure(),
  //server start callback
  (error, port) => {
    console.log(`listening on port ${port}`);
    server.start();
  }
);
