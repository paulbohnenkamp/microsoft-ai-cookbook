import OpenAI from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { z } from "zod";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const description = process.env.NORTHSTAR_DESCRIPTION;
const requesterType = process.env.NORTHSTAR_REQUEST_TYPE;

if (!endpoint || !deployment || !description || !requesterType) {
  throw new Error(
    "Set AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_DEPLOYMENT, NORTHSTAR_DESCRIPTION, and NORTHSTAR_REQUEST_TYPE."
  );
}

const classificationSchema = z.enum(["Hardware", "Software", "Access", "Other"]);

const tokenProvider = getBearerTokenProvider(
  new DefaultAzureCredential(),
  "https://cognitiveservices.azure.com/.default"
);

const client = new OpenAI({
  baseURL: `${endpoint.replace(/\/+$/, "")}/openai/v1/`,
  apiKey: tokenProvider as any,
});

const response = await client.responses.create({
  model: deployment,
  reasoning: { effort: "none" },
  max_output_tokens: 20,
  store: false,
  input: `You classify Northstar IT service requests.

Classify the following request as exactly one of:
Hardware
Software
Access
Other

Request:
${description}`,
});

const rawResult = response.output_text.trim();
const parsed = classificationSchema.safeParse(rawResult);

console.log(`Raw model result: ${rawResult}`);

if (!parsed.success) {
  console.error("Validated classification: unexpected value");
  process.exitCode = 1;
} else {
  console.log(`Validated classification: ${parsed.data}`);
  console.log(`Requester-selected Request Type: ${requesterType}`);
  console.log(`Match: ${parsed.data === requesterType ? "Yes" : "No"}`);
}
