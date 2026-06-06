import User from "../models/userModel";

const TOKEN_INDEXES = [
  {
    name: "formToken_1",
    spec: { formToken: 1 as const },
    options: { unique: true, sparse: true },
  },
  {
    name: "formTokenPrefix_1",
    spec: { formTokenPrefix: 1 as const },
    options: { unique: true, sparse: true },
  },
] as const;

async function dropIndexIfExists(indexName: string): Promise<void> {
  try {
    await User.collection.dropIndex(indexName);
    console.log(`[mailprex] Dropped index ${indexName}`);
  } catch (error) {
    const mongoError = error as { code?: number; message?: string };
    if (
      mongoError.code === 27 ||
      mongoError.message?.includes("index not found")
    ) {
      return;
    }
    throw error;
  }
}

function isSparseUnique(index: Record<string, unknown> | undefined): boolean {
  return Boolean(index?.unique && index?.sparse);
}

async function ensureSparseUniqueIndex(
  name: string,
  spec: Record<string, 1 | -1>,
  options: { unique: true; sparse: true }
): Promise<void> {
  const indexes = await User.collection.indexes();
  const existing = indexes.find((entry) => entry.name === name);

  if (existing && !isSparseUnique(existing)) {
    await dropIndexIfExists(name);
  }

  const refreshed = await User.collection.indexes();
  const current = refreshed.find((entry) => entry.name === name);

  if (!current) {
    await User.collection.createIndex(spec, { ...options, name });
    console.log(`[mailprex] Created sparse index ${name}`);
  }
}

async function cleanupNullTokenFields(): Promise<void> {
  await User.collection.updateMany(
    { formToken: { $in: [null, ""] } },
    { $unset: { formToken: "" } }
  );
  await User.collection.updateMany(
    { formTokenPrefix: { $in: [null, ""] } },
    { $unset: { formTokenPrefix: "" } }
  );
  await User.collection.updateMany(
    { formTokenHash: { $in: [null, ""] } },
    { $unset: { formTokenHash: "" } }
  );
}

export async function ensureFormTokenIndexes(): Promise<void> {
  const indexes = await User.collection.indexes();

  for (const { name } of TOKEN_INDEXES) {
    const existing = indexes.find((entry) => entry.name === name);
    if (existing && !isSparseUnique(existing)) {
      await dropIndexIfExists(name);
    }
  }

  await cleanupNullTokenFields();

  for (const { name, spec, options } of TOKEN_INDEXES) {
    await ensureSparseUniqueIndex(name, spec, options);
  }
}
