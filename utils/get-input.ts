export const getInputFor = <T>(
  day: number,
  processor: (data: string) => T,
  type: "examples" | "inputs" = "inputs"
): T => {
  const text = Deno.readTextFileSync(`./${type}/day${day}.txt`);
  return processor(text);
};
