module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],

  // ✅ Tambahan penting untuk menunjuk tsconfig yang cocok untuk test
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json", // ganti sesuai lokasi tsconfig untuk app (bukan tsconfig.json root)
    },
  },
};
