export async function tryCatchWrapper<T>(
  fn: () => Promise<T>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("❌ Repository Error:", error);

    // Puedes personalizar el mensaje
    throw new Error("APPLICATION_REPOSITORY_ERROR");
  }
}