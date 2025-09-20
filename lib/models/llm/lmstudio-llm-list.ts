import { LLM } from "@/types"

const LM_STUDIO_PLATFORM_LINK = "https://lmstudio.ai"

// Common local models that users might run in LM Studio
export const LMSTUDIO_LLM_LIST: LLM[] = [
  {
    modelId: "llama-3-8b-instruct",
    modelName: "Llama 3 8B Instruct",
    provider: "lmstudio",
    hostedId: "llama-3-8b-instruct",
    platformLink: LM_STUDIO_PLATFORM_LINK,
    imageInput: false
  },
  {
    modelId: "llama-3-70b-instruct", 
    modelName: "Llama 3 70B Instruct",
    provider: "lmstudio",
    hostedId: "llama-3-70b-instruct",
    platformLink: LM_STUDIO_PLATFORM_LINK,
    imageInput: false
  },
  {
    modelId: "codellama-13b-instruct",
    modelName: "Code Llama 13B Instruct",
    provider: "lmstudio",
    hostedId: "codellama-13b-instruct", 
    platformLink: LM_STUDIO_PLATFORM_LINK,
    imageInput: false
  },
  {
    modelId: "mistral-7b-instruct",
    modelName: "Mistral 7B Instruct",
    provider: "lmstudio",
    hostedId: "mistral-7b-instruct",
    platformLink: LM_STUDIO_PLATFORM_LINK,
    imageInput: false
  },
  {
    modelId: "phi-3-medium-instruct",
    modelName: "Phi-3 Medium Instruct",
    provider: "lmstudio",
    hostedId: "phi-3-medium-instruct",
    platformLink: LM_STUDIO_PLATFORM_LINK,
    imageInput: false
  },
  {
    modelId: "lmstudio-custom",
    modelName: "Custom Model (LM Studio)",
    provider: "lmstudio", 
    hostedId: "custom",
    platformLink: LM_STUDIO_PLATFORM_LINK,
    imageInput: false
  }
]