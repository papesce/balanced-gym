import * as React from "react";
import { TargetForm } from "../component/TargetForm";
import { connect, Dispatch } from "react-redux";
import { State } from "../redux/model";
import { getMusclesStarted, setTarget } from "../redux/actions";

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
    const { targets = [], availableTargets, selectedTarget = "", loading } = this.props;
    const ftargets = availableTargets.length > 0 ? availableTargets : targets;
    return (
      <TargetForm
        targets={ftargets}
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
    loading: state.filter.muscles ? state.filter.muscles.loading : false,
    targets: state.filter.muscles ? state.filter.muscles.muscles : []
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
  ownProps: TargetRCProps
) => {
  return {
    setTarget: (value: string) => dispatch(setTarget(value)),
    getTargetsStarted: () => dispatch(getMusclesStarted())
  };
};

const TargetC = connect/*<TargetRCProps>*/(mapStateToProps, mapDispatchToProps)(
  TargetRC
);

export { TargetC };
