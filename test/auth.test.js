const request = require("supertest");
const app = require("../index"); // Assuming your Express app is exported from app.js
const { ROUTES } = require("../constants/routes");

describe("Auth Routes", () => {
  describe("POST /auth/register", () => {
    it("should register a user successfully", async () => {
      const res = await request(app)
        .post(ROUTES.BASE + ROUTES.AUTH.BASE + ROUTES.AUTH.REGISTER)
        .send({
          name: "Subhradwip Kulavi",
          email: "kulavisubhradwip16@gmail.com",
          password: "Subhra@123",
          age: 25,
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
    });

    it("should fail to register a user with an existing email", async () => {
      const res = await request(app)
        .post(ROUTES.BASE + ROUTES.AUTH.BASE + ROUTES.AUTH.REGISTER)
        .send({
          name: "Subhradwip Kulavi",
          email: "kulavisubhradwip16@gmail.com",
          password: "Subhra@123",
          age: 10,
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("POST /auth/login", () => {
    it("should login a user successfully", async () => {
      const res = await request(app)
        .post(ROUTES.BASE + ROUTES.AUTH.BASE + ROUTES.AUTH.LOGIN)
        .send({
          email: "kulavisubhradwip16@gmail.com",
          password: "Subhra@123",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login successful");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data).toHaveProperty("name", "Subhradwip Kulavi");
    });

    it("should fail to login with incorrect password", async () => {
      const res = await request(app)
        .post(ROUTES.BASE + ROUTES.AUTH.BASE + ROUTES.AUTH.LOGIN)
        .send({
          email: "kulavisubhradwip16@gmail.com",
          password: "wrongpassword",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
  });
});
