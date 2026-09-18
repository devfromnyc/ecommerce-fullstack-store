delete process.env.DATABASE_URL;
delete process.env.VERCEL;

async function main() {
  const { db } = await import("../src/lib/db/index.ts");
  console.log("import-ok");

  try {
    void db.select;
    console.error("expected DATABASE_URL error on first db access");
    process.exit(1);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("DATABASE_URL")) {
      console.error("unexpected error:", message);
      process.exit(1);
    }
    console.log("access-threw-as-expected");
  }
}

void main();
