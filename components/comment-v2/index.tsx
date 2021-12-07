import React from 'react'

export type MappingType =
  | 'pathname'
  | 'url'
  | 'title'
  | 'og:title'
  | 'issue-number'
  | 'issue-term'

export type Theme =
  | 'github-light'
  | 'github-dark'
  | 'preferred-color-scheme'
  | 'github-dark-orange'
  | 'icy-dark'
  | 'dark-blue'
  | 'photon-dark'

interface ReactUtterancesProps {
  repo: string
  issueMap: MappingType
  issueTerm?: string
  issueNumber?: number
  label?: string
  theme: Theme
}

interface ReactUtterancesState {
  pending: boolean
}

export default class ReactUtterances extends React.Component<
  ReactUtterancesProps,
  ReactUtterancesState
> {
  reference: React.RefObject<HTMLDivElement>
  scriptElement: any

  constructor(props: ReactUtterancesProps) {
    super(props)

    if (props.issueMap === 'issue-term' && props.issueTerm === undefined) {
      throw Error(
        "Property 'issueTerm' must be provided with issueMap 'issue-term'"
      )
    }

    if (props.issueMap === 'issue-number' && props.issueNumber === undefined) {
      throw Error(
        "Property 'issueNumber' must be provided with issueMap 'issue-number'"
      )
    }

    this.reference = React.createRef<HTMLDivElement>()
    this.state = { pending: true }
  }

  UNSAFE_componentWillReceiveProps(props: ReactUtterancesProps) {
    // this.scriptElement.setAttribute('theme', props.theme)
    const iframe = document.querySelector('iframe.utterances-frame') as any

    if (iframe) {
      iframe.contentWindow.postMessage(
        { type: 'set-theme', theme: props.theme },
        'https://utteranc.es/'
      )
    }
  }

  componentDidMount(): void {
    const { repo, issueMap, issueTerm, issueNumber, label, theme } = this.props
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://utteranc.es/client.js'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.setAttribute('repo', repo)
    scriptElement.setAttribute('crossorigin', 'annonymous')
    scriptElement.setAttribute('theme', theme)
    scriptElement.onload = () => this.setState({ pending: false })

    if (label) {
      scriptElement.setAttribute('label', label)
    }

    if (issueMap === 'issue-number' && issueNumber) {
      scriptElement.setAttribute('issue-number', issueNumber.toString())
    } else if (issueMap === 'issue-term' && issueTerm) {
      scriptElement.setAttribute('issue-term', issueTerm)
    } else {
      scriptElement.setAttribute('issue-term', issueMap)
    }

    // TODO: Check current availability
    this.scriptElement = scriptElement
    this.reference.current?.appendChild(scriptElement)
  }

  render(): React.ReactElement {
    return (
      <div>
        <div ref={this.reference}>
          {this.state.pending && <p>Loading Comments...</p>}
        </div>
      </div>
    )
  }
}