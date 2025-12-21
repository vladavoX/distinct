import { GithubInfo } from "fumadocs-ui/components/github-info";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      links={[
        {
          type: "custom",
          children: (
            <GithubInfo owner="vladavoX" repo="distinct" className="lg:-mx-2" />
          ),
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
