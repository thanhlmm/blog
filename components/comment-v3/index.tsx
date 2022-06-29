import React from "react";

export type MappingType =
  | "pathname"
  | "url"
  | "title"
  | "og:title"
  | "issue-number"
  | "specific";

export type Theme =
  | "light"
  | "dark"
  | "preferred_color_scheme"
  | "dark_dimmed"
  | "transparent_dark";

interface ReactGiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  dataMapping: MappingType;
  dataTerm?: string;
  issueNumber?: number;
  label?: string;
  theme: Theme;
}

interface ReactGiscusState {
  pending: boolean;
}

export default class ReactGiscus extends React.Component<
  ReactGiscusProps,
  ReactGiscusState
> {
  reference: React.RefObject<HTMLDivElement>;
  scriptElement: any;

  constructor(props: ReactGiscusProps) {
    super(props);
    this.reference = React.createRef<HTMLDivElement>();
    this.state = { pending: true };
  }

  componentDidMount(): void {
    const {
      repo,
      repoId,
      category,
      categoryId,
      dataMapping,
      dataTerm,
      label,
      theme,
    } = this.props;
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://giscus.app/client.js";
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.setAttribute("data-repo", repo);
    scriptElement.setAttribute("data-repo-id", repoId);
    scriptElement.setAttribute("data-category", category);
    scriptElement.setAttribute("data-category-id", categoryId);
    scriptElement.setAttribute("data-mapping", dataMapping);
    if (dataMapping === "specific" && dataTerm) {
      scriptElement.setAttribute(
        "data-term",
        dataTerm
        // window.location.hostname + window.location.pathname
      );
    }
    scriptElement.setAttribute("data-reactions-enabled", "1");
    scriptElement.setAttribute("data-emit-metadata", "0");
    scriptElement.setAttribute("data-theme", theme);
    scriptElement.setAttribute("data-lang", "en");
    scriptElement.setAttribute("crossorigin", "annonymous");
    scriptElement.onload = () => this.setState({ pending: false });

    if (label) {
      scriptElement.setAttribute("label", label);
    }

    // TODO: Check current availability
    this.scriptElement = scriptElement;

    setTimeout(() => {
      this.reference.current?.appendChild(scriptElement);
    }, 3000);
  }

  render(): React.ReactElement {
    return (
      <div>
        <div ref={this.reference}>
          {this.state.pending && <p>Loading Comments...</p>}
        </div>
      </div>
    );
  }
}
