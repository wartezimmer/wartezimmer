export enum Environment {
    PRODUCTION = "PRODUCTION",
    STAGING = "STAGING",
    DEVELOPMENT = "DEVELOPMENT",
}

export const ENVIRONMENT_MAP: Map<string, Environment> = new Map([
    ["https://<fill in production url here>", Environment.PRODUCTION],
    ["https://frontend-staging.feinarbyte.de", Environment.STAGING],
]);

export const CURRENT_ENVIRONMENT: Environment = ENVIRONMENT_MAP.get(location.origin) ?? Environment.DEVELOPMENT;

