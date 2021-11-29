module.exports = {
  verbose: false,
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testRegex: "(src)/.*\\.test\\.tsx?$",
  moduleDirectories: ["./node_modules", "./src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
