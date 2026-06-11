type CloudinaryEnv = "test" | "prod";

const envMap: Record<string, CloudinaryEnv> = {
  TEST: "test",
  PRODUCTION: "prod",
};

const rawEnv = process.env.NEXT_PUBLIC_ENV ?? "";
export const cloudinaryEnv: CloudinaryEnv = envMap[rawEnv] ?? "prod";

export function withEnvFolder(folder: string): string {
  return `${cloudinaryEnv}/${folder}`;
}
