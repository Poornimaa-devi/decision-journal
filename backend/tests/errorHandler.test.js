const mongoose = require("mongoose");
const errorHandler = require("../middleware/errorHandler");

// errorHandler is plain middleware, so it can be tested with a fake response object.
function run(err) {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  errorHandler(err, {}, res, () => {});
  return { status: res.status.mock.calls[0][0], body: res.json.mock.calls[0][0] };
}

describe("errorHandler", () => {
  it("turns a Mongoose ValidationError into 400 with one message per field", () => {
    const err = new mongoose.Error.ValidationError();
    err.addError("title", new mongoose.Error.ValidatorError({ message: "Goal title is required", path: "title" }));
    err.addError("value", new mongoose.Error.ValidatorError({ message: "Too high", path: "value" }));

    const { status, body } = run(err);

    expect(status).toBe(400);
    expect(body.message).toBe("Validation failed");
    expect(body.errors).toEqual({ title: "Goal title is required", value: "Too high" });
  });

  it("turns a CastError (bad ObjectId) into 400, not 500", () => {
    const { status, body } = run(new mongoose.Error.CastError("ObjectId", "not-an-id", "_id"));
    expect(status).toBe(400);
    expect(body.message).toBe("Invalid value for _id");
  });

  it("turns a duplicate-key error (code 11000) into 409 naming the field", () => {
    const { status, body } = run({ code: 11000, keyValue: { email: "a@b.com" } });
    expect(status).toBe(409);
    expect(body.errors).toEqual({ email: "That email is already in use" });
  });

  it("turns malformed JSON into 400", () => {
    const { status, body } = run({ type: "entity.parse.failed" });
    expect(status).toBe(400);
    expect(body.message).toBe("Request body is not valid JSON");
  });

  it("uses err.statusCode when one is set", () => {
    const err = new Error("Teapot");
    err.statusCode = 418;
    expect(run(err)).toEqual({ status: 418, body: { message: "Teapot" } });
  });

  it("falls back to 500 for anything unexpected", () => {
    expect(run(new Error("boom")).status).toBe(500);
  });
});