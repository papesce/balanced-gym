import * as React from "react";
import { TargetForm } from "../component/TargetForm";
import { connect, Dispatch } from "react-redux";
import { State } from "../redux/model";
import { getTargetsStarted, setTarget } from "../redux/actions";

interface TargetRCProps {
  setTarget?: (value: string) => void;
  getTargetsStarted?: () => void;
  selectedTarget: string;
  loading?: boolean;
  targets?: Array<string>;
}

export class TargetRC extends React.Component<TargetRCProps> {
  constructor(props: TargetRCProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.props.getTargetsStarted) {
      this.props.getTargetsStarted();
    }
  }
  handleChange = value => {
    if (this.props.setTarget) {
      this.props.setTarget(value);
    }
  }
  render() {
    const { targets = [], selectedTarget = "", loading } = this.props;
    return (
      <TargetForm
        targets={targets}
        handleChange={this.handleChange}
        defaultValue={selectedTarget}
        loading={loading !== undefined}
      />
    );
  }
}

const mapStateToProps = (state: State): TargetRCProps => {
  return {
    selectedTarget: state.filter.selectedTarget,
    loading: state.filter.targets ? state.filter.targets.loading : false,
    targets: state.filter.targets ? state.filter.targets.targets : []
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: TargetRCProps
) => {
  return {
    setTarget: (value: string) => dispatch(setTarget(value)),
    getTargetsStarted: () => dispatch(getTargetsStarted())
  };
};

const TargetC = connect<TargetRCProps>(mapStateToProps, mapDispatchToProps)(
  TargetRC
);

export { TargetC };
