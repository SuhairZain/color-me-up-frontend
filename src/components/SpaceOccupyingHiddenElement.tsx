import { PureComponent, ReactElement, cloneElement } from "react";

import "./SpaceOccupyingHiddenElement.css";

type Props = {
    children: ReactElement;
    visible: boolean;
    alwaysOccupySpace?: boolean;
};

/** Renders the child but hides it while occupying its space when it
 * should not be visible. By having the elements take up space
 * in the UI even when they are hidden, we can avoid the other elements
 * moving around when the hidden elements are shown. */
class SpaceOccupyingHiddenElement extends PureComponent<Props, never> {
    render() {
        const { children, visible, alwaysOccupySpace } = this.props;

        return cloneElement(children, {
            className: [
                "SpaceOccupyingHiddenElement",
                visible ? "" : "Hidden",
                alwaysOccupySpace ? "AlwaysOccupySpace" : "",
                children.props.className || "",
            ].join(" "),
        });
    }
}

export default SpaceOccupyingHiddenElement;
