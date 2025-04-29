declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    ALLOWED_ORIGIN_PATTERNS?: string;
    CONNECTION_TO_DATABASE: string;
  }
}
