import { Model } from "@/lib/prompts/utils";

export async function GET(req: Request) {
  return Response.json({
    prompt: {
      model: Model?.prompt,
      revision: Model.revision,
      format: Model.format,
      note: Model.note,
    },
  });
}
