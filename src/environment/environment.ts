class Environment {
  get secret(): string {
    return process.env.SECRET || "secret";
  }
  get tokenExpiresIn(): number {
    if (!process.env.TOKEN_EXPIRES_IN) {
      return 86400;
    }
    return parseFloat(process.env.TOKEN_EXPIRES_IN);
  }
  get connectionDatabaseString(): string {
    return (
      process.env.CONNECTION_DATABASE_STRING || "mongodb://127.0.0.1:27017"
    );
  }
  get databaseName(): string {
    return process.env.DATABASE_NAME || "renko-local-database";
  }
  get sendGridApiKey(): string {
    return (
      process.env.SEND_GRID_API_KEY ||
      "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"
    );
  }
  get emailConfirmUrl(): string {
    return (
      process.env.EMAIL_CONFIRM_URL ||
      "https://renko-api.herokuapp.com/auth/email-confirm?emailToken="
    );
  }
}
export const Environments = new Environment();
