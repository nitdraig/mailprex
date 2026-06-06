import User from "../models/userModel";

async function dropIndexIfExists(indexName: string): Promise<void> {
  try {
    await User.collection.dropIndex(indexName);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("index not found")) {
      throw error;
    }
  }
}

async function recreateSparseUniqueIndexIfNeeded(indexName: string): Promise<void> {
  const indexes = await User.collection.indexes();
  const existing = indexes.find((index) => index.name === indexName);

  if (existing && (!existing.sparse || !existing.unique)) {
    await dropIndexIfExists(indexName);
  }
}

export async function ensureFormTokenIndexes(): Promise<void> {
  await User.updateMany({ formToken: null }, { $unset: { formToken: "" } });
  await User.updateMany({ formToken: "" }, { $unset: { formToken: "" } });
  await User.updateMany(
    { formTokenPrefix: null },
    { $unset: { formTokenPrefix: "" } }
  );
  await User.updateMany(
    { formTokenPrefix: "" },
    { $unset: { formTokenPrefix: "" } }
  );
  await User.updateMany(
    { formTokenHash: null },
    { $unset: { formTokenHash: "" } }
  );

  await recreateSparseUniqueIndexIfNeeded("formToken_1");
  await recreateSparseUniqueIndexIfNeeded("formTokenPrefix_1");

  await User.syncIndexes();
}
