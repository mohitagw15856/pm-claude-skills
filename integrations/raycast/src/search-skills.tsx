import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

const CATALOG = "https://mohitagw15856.github.io/pm-claude-skills/skills.json";
const PLAYGROUND = "https://mohitagw15856.github.io/pm-claude-skills";
const REPO = "https://github.com/mohitagw15856/pm-claude-skills";

type Skill = {
  name: string;
  title?: string;
  summary?: string;
  description?: string;
  plugin?: string;
  tier?: string;
  eval?: { score?: number } | null;
};

// The catalog is either a bare array or { skills: [...] } depending on build.
type Catalog = Skill[] | { skills: Skill[] };

export default function Command() {
  const { data, isLoading } = useFetch<Catalog>(CATALOG, { keepPreviousData: true });
  const skills: Skill[] = Array.isArray(data) ? data : (data?.skills ?? []);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search professional Agent Skills…">
      <List.EmptyView
        icon={Icon.MagnifyingGlass}
        title="No skills match"
        description="Try a broader term, or open the full playground."
        actions={
          <ActionPanel>
            <Action.OpenInBrowser title="Open Playground" url={PLAYGROUND} />
          </ActionPanel>
        }
      />
      {skills.map((s) => {
        const url = `${PLAYGROUND}/?skill=${s.name}`;
        const subtitle = s.summary || s.description || "";
        const accessories: List.Item.Accessory[] = [];
        if (s.plugin) accessories.push({ tag: s.plugin });
        if (s.eval?.score) accessories.push({ text: `★ ${s.eval.score}` });

        return (
          <List.Item
            key={s.name}
            icon={Icon.Stars}
            title={s.title || s.name}
            subtitle={subtitle}
            keywords={[s.name, s.plugin ?? "", s.tier ?? ""]}
            accessories={accessories}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action.OpenInBrowser title="Run in Playground" url={url} icon={Icon.Play} />
                  <Action.CopyToClipboard
                    title="Copy Run Command"
                    content={`npx pm-claude-skills run ${s.name} --text "…"`}
                    icon={Icon.Terminal}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                  />
                  <Action.CopyToClipboard
                    title="Copy Install Command"
                    content={"npx pm-claude-skills add --agent claude"}
                    icon={Icon.Download}
                    shortcut={{ modifiers: ["cmd"], key: "i" }}
                  />
                </ActionPanel.Section>
                <ActionPanel.Section>
                  <Action.CopyToClipboard
                    title="Copy Skill Name"
                    content={s.name}
                    shortcut={{ modifiers: ["cmd"], key: "." }}
                  />
                  <Action.CopyToClipboard
                    title="Copy Playground Link"
                    content={url}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                  />
                  <Action.OpenInBrowser title="View Repository" url={REPO} icon={Icon.Code} />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
