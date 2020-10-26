class Environment {
  get secret(): string {
    return process.env.secret || "secret";
  }
  get tokenExpiresIn(): number {
    if (!process.env.tokenExpiresIn) {
      return 86400;
    }
    return parseFloat(process.env.tokenExpiresIn);
  }
  get connectionString(): string {
    return (
      // process.env.connectionString ||
      "mongodb+srv://username:Qwerty!123@cluster0.sq8uv.mongodb.net/training?retryWrites=true&w=majority"
    );
  }
  get databaseName(): string {
    return (
      // process.env.databaseName ||
      "training"
    );
  }
  get sendGridApiKey(): string {
    return (
      // process.env.sendGridApiKey ||
      "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"
    );
  }
  get emailConfirmUrl(): string {
    return "https://node-js-training-api.herokuapp.com/auth/email-confirm?emailToken=";
  }
}
export const Environments = new Environment();
