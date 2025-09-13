/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    DATABASE_URL?: string;
    PGUSER?: string;
    PGPASSWORD?: string;
    PGDATABASE?: string;
  }
}


