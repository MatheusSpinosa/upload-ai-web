import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

interface IPrompts {
  id: string
  title: string
  template: string
}

interface IProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: IProps) {
  const [prompts, setPrompts] = useState<IPrompts[]>([])

  useEffect(() => {
    api.get('/prompts').then((response) => {
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelected(promptId: string) {
    const result = prompts.find((p) => p.id === promptId)

    if (!result) {
      return
    }
    props.onPromptSelected(result.template)
  }

  return(
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecio um prompt" />
      </SelectTrigger>
      <SelectContent>
        {
          prompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}